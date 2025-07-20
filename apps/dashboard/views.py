from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta
from apps.consent.models import ConsentRecord, DataSharingRequest
from apps.audit.models import AccessLog

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Active consents
        active_consents = ConsentRecord.objects.filter(
            user=user,
            is_active=True,
            revoked_at__isnull=True
        ).count()
        
        # Pending requests
        pending_requests = DataSharingRequest.objects.filter(
            user=user,
            status='pending'
        ).count()
        
        # Recent activity (last 7 days)
        last_week = timezone.now() - timedelta(days=7)
        recent_logs = AccessLog.objects.filter(
            user=user,
            created_at__gte=last_week
        ).count()
        
        # Data access frequency
        access_logs = AccessLog.objects.filter(
            user=user,
            action='data_accessed'
        ).values('partner__name').annotate(
            access_count=Count('id')
        ).order_by('-access_count')[:5]
        
        return Response({
            'stats': {
                'active_consents': active_consents,
                'pending_requests': pending_requests,
                'recent_activity': recent_logs,
            },
            'top_accessors': list(access_logs),
            'privacy_score': self._calculate_privacy_score(user)
        })
    
    def _calculate_privacy_score(self, user):
        """Calculate user's privacy score"""
        score = 100
        
        # Deduct points for each active consent
        active_consents = ConsentRecord.objects.filter(
            user=user, is_active=True
        ).count()
        score -= (active_consents * 5)
        
        # Add points for strict privacy mode
        if user.privacy_mode == 'strict':
            score += 10
        elif user.privacy_mode == 'permissive':
            score -= 10
        
        return max(0, min(100, score))