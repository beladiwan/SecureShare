from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class AccessLog(models.Model):
    """Audit log for data access"""
    
    ACTION_TYPES = [
        ('consent_requested', 'Consent Requested'),
        ('consent_granted', 'Consent Granted'),
        ('consent_denied', 'Consent Denied'),
        ('data_accessed', 'Data Accessed'),
        ('access_denied', 'Access Denied'),
        ('consent_revoked', 'Consent Revoked'),
    ]
    
    log_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    partner = models.ForeignKey('partners.Partner', on_delete=models.SET_NULL, null=True)
    consent = models.ForeignKey('consent.ConsentRecord', on_delete=models.SET_NULL, null=True)
    
    action = models.CharField(max_length=30, choices=ACTION_TYPES)
    success = models.BooleanField(default=False)
    
    ip_address = models.GenericIPAddressField(null=True)
    user_agent = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'access_logs'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.action} - {self.created_at}"