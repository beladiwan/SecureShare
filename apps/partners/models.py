from django.db import models
import uuid
import secrets

class Partner(models.Model):
    """Partner organizations that can request user data"""
    
    PARTNER_TYPES = [
        ('insurance', 'Insurance Company'),
        ('bank', 'Bank'),
        ('nbfc', 'NBFC'),
        ('fintech', 'Fintech Platform'),
    ]
    
    partner_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, unique=True)
    partner_type = models.CharField(max_length=50, choices=PARTNER_TYPES)
    
    # Authentication
    api_key = models.CharField(max_length=64, unique=True, blank=True)
    api_secret = models.CharField(max_length=128, blank=True)
    
    # Compliance
    registration_number = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    # Contact
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=17)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'partners'
        
    def __str__(self):
        return f"{self.name} ({self.partner_type})"
    
    def save(self, *args, **kwargs):
        if not self.api_key:
            self.api_key = secrets.token_urlsafe(32)
        if not self.api_secret:
            self.api_secret = secrets.token_urlsafe(64)
        super().save(*args, **kwargs)