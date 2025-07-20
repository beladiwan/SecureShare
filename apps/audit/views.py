from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import AccessLog
from .serializers import AccessLogSerializer

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AccessLogSerializer
    
    def get_queryset(self):
        return AccessLog.objects.filter(
            user=self.request.user
        ).select_related('partner', 'consent')