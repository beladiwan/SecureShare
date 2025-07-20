from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from django.db.models import Count, Q
from datetime import timedelta

from apps.consent.models import ConsentRecord, DataSharingRequest
from apps.audit.models import AccessLog
from apps.privacy_engine.services import DataTransformer
from core.exceptions import InvalidTokenException, AccessLimitExceededException
from .authentication import PartnerAuthentication
from .serializers import DataAccessSerializer, ConsentRevokeSerializer


class DataAccessView(APIView):
    """API endpoint for accessing user data with a token"""
    authentication_classes = []
    permission_classes = []
    
    def get(self, request, token):
        """Access user data using access token"""
        try:
            consent = ConsentRecord.objects.select_related(
                'user', 'request__partner'
            ).prefetch_related(
                'consented_data_categories'
            ).get(
                access_token=token,
                is_active=True
            )
        except ConsentRecord.DoesNotExist:
            # Log failed attempt
            AccessLog.objects.create(
                action='invalid_token',
                success=False,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            raise InvalidTokenException()
        
        # Validate consent is still valid
        if not consent.is_valid():
            reason = self._get_invalidity_reason(consent)
            AccessLog.objects.create(
                consent=consent,
                partner=consent.request.partner,
                user=consent.user,
                action='access_denied',
                success=False,
                ip_address=request.META.get('REMOTE_ADDR'),
                error_details={'reason': reason}
            )
            return Response(
                {'error': f'Access denied: {reason}'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check access limit
        if consent.access_count >= consent.max_access_count:
            AccessLog.objects.create(
                consent=consent,
                partner=consent.request.partner,
                user=consent.user,
                action='limit_exceeded',
                success=False,
                ip_address=request.META.get('REMOTE_ADDR')
            )
            raise AccessLimitExceededException()
        
        # Get and transform data
        transformed_data = self._get_transformed_data(consent)
        
        # Update access count
        consent.access_count += 1
        consent.last_accessed_at = timezone.now()
        consent.save()
        
        # Log successful access
        AccessLog.objects.create(
            consent=consent,
            partner=consent.request.partner,
            user=consent.user,
            action='data_accessed',
            success=True,
            accessed_data_categories=list(transformed_data.keys()),
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return Response({
            'status': 'success',
            'data': transformed_data,
            'metadata': {
                'consent_id': str(consent.consent_id),
                'access_count': consent.access_count,
                'remaining_access': consent.max_access_count - consent.access_count,
                'expires_at': consent.token_expires_at.isoformat()
            }
        })
    
    def _get_invalidity_reason(self, consent):
        """Determine why consent is invalid"""
        if consent.revoked_at:
            return "consent_revoked"
        elif timezone.now() > consent.token_expires_at:
            return "token_expired"
        elif consent.access_count >= consent.max_access_count:
            return "access_limit_exceeded"
        return "invalid_consent"
    
    def _get_transformed_data(self, consent):
        """Get and transform user data based on consent"""
        transformer = DataTransformer()
        transformed_data = {}
        
        # Mock user financial data - In production, fetch from actual sources
        user_data = {
            'income': 95000,
            'employment': {
                'type': 'salaried',
                'company': 'Infosys Ltd',
                'years': 5
            },
            'transactions': [
                {'type': 'credit', 'amount': 95000, 'date': '2025-01-01'},
                {'type': 'debit', 'amount': 65000, 'date': '2025-01-02'},
                {'type': 'credit', 'amount': 5000, 'date': '2025-01-05'},
                {'type': 'debit', 'amount': 10000, 'date': '2025-01-10'},
            ]
        }
        
        # Transform based on consented categories
        for category in consent.consented_data_categories.all():
            if category.code == 'income_range' and 'income' in user_data:
                transformed_data['income_range'] = transformer.transform_income(user_data['income'])
            
            elif category.code == 'employment_status' and 'employment' in user_data:
                transformed_data['employment_status'] = transformer.transform_employment(user_data['employment'])
            
            elif category.code == 'financial_stability' and 'transactions' in user_data:
                transformed_data['financial_stability'] = transformer.calculate_financial_score(user_data['transactions'])
        
        return transformed_data


class PartnerDataAccessView(APIView):
    """API endpoint for partners to access data using their API credentials"""
    authentication_classes = [PartnerAuthentication]
    permission_classes = []
    
    def post(self, request):
        """Access user data using partner credentials and access token"""
        serializer = DataAccessSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        access_token = serializer.validated_data['access_token']
        partner = request.auth  # Set by PartnerAuthentication
        
        # Use the same logic as DataAccessView but with partner validation
        # ... (similar implementation)
        
        return Response({'message': 'Partner access endpoint'})


class RevokeConsentView(APIView):
    """API endpoint to revoke consent"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Revoke an active consent"""
        serializer = ConsentRevokeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        consent_id = serializer.validated_data['consent_id']
        reason = serializer.validated_data.get('reason', 'User requested')
        
        try:
            consent = ConsentRecord.objects.get(
                consent_id=consent_id,
                user=request.user,
                is_active=True
            )
        except ConsentRecord.DoesNotExist:
            return Response(
                {'error': 'Consent not found or already revoked'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Revoke the consent
        consent.revoke(reason=reason)
        
        # Log the revocation
        AccessLog.objects.create(
            consent=consent,
            partner=consent.request.partner,
            user=request.user,
            action='consent_revoked',
            success=True,
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        return Response({
            'message': 'Consent revoked successfully',
            'consent_id': str(consent_id)
        })


class UserStatsView(APIView):
    """Get user statistics"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get detailed user statistics"""
        user = request.user
        
        # Calculate various stats
        total_requests = DataSharingRequest.objects.filter(user=user).count()
        approved_requests = DataSharingRequest.objects.filter(
            user=user, 
            status='approved'
        ).count()
        
        active_consents = ConsentRecord.objects.filter(
            user=user,
            is_active=True,
            revoked_at__isnull=True
        ).count()
        
        # Data access in last 30 days
        last_month = timezone.now() - timedelta(days=30)
        recent_access = AccessLog.objects.filter(
            user=user,
            action='data_accessed',
            created_at__gte=last_month
        ).count()
        
        # Most frequent accessors
        top_partners = AccessLog.objects.filter(
            user=user,
            action='data_accessed'
        ).values('partner__name').annotate(
            count=Count('id')
        ).order_by('-count')[:5]
        
        return Response({
            'lifetime_stats': {
                'total_requests': total_requests,
                'approved_requests': approved_requests,
                'approval_rate': (approved_requests / total_requests * 100) if total_requests > 0 else 0
            },
            'current_stats': {
                'active_consents': active_consents,
                'recent_access_count': recent_access,
            },
            'top_partners': list(top_partners),
            'privacy_preferences': {
                'mode': user.privacy_mode,
                'default_duration': user.default_consent_duration_days
            }
        })


class HealthCheckView(APIView):
    """Health check endpoint for monitoring"""
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def get(self, request):
        """Return health status"""
        return Response({
            'status': 'healthy',
            'timestamp': timezone.now().isoformat(),
            'version': '1.0.0',
            'service': 'Canara SecureShare API'
        })