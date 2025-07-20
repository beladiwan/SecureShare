from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db import transaction
from .models import DataSharingRequest, ConsentRecord, DataCategory
from .serializers import (
    DataSharingRequestSerializer, 
    ConsentApprovalSerializer,
    ConsentRecordSerializer
)

class ConsentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = DataSharingRequestSerializer
    
    def get_queryset(self):
        return DataSharingRequest.objects.filter(
            user=self.request.user,
            status='pending'
        ).select_related('partner').prefetch_related('requested_data_categories')
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve consent request"""
        sharing_request = self.get_object()
        
        if sharing_request.status != 'pending':
            return Response(
                {"error": "Request is not pending"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ConsentApprovalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        with transaction.atomic():
            # Update request
            sharing_request.status = 'approved'
            sharing_request.responded_at = timezone.now()
            sharing_request.save()
            
            # Create consent
            consent = ConsentRecord.objects.create(
                request=sharing_request,
                user=request.user,
                consent_given=True,
                consent_duration_days=serializer.validated_data['duration_days'],
                max_access_count=serializer.validated_data['max_access_count']
            )
            
            # Add categories
            category_codes = serializer.validated_data['consented_categories']
            categories = DataCategory.objects.filter(code__in=category_codes)
            consent.consented_data_categories.set(categories)
        
        return Response({
            "message": "Consent granted",
            "consent_id": consent.consent_id,
            "access_token": consent.access_token
        })
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject consent request"""
        sharing_request = self.get_object()
        sharing_request.status = 'rejected'
        sharing_request.responded_at = timezone.now()
        sharing_request.save()
        
        return Response({"message": "Request rejected"})
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get active consents"""
        consents = ConsentRecord.objects.filter(
            user=request.user,
            is_active=True
        )
        serializer = ConsentRecordSerializer(consents, many=True)
        return Response(serializer.data)