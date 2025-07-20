from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import uuid
import secrets

User = get_user_model()

class DataCategory(models.Model):
    """Types of data that can be shared"""
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    sensitivity_level = models.IntegerField(default=2)
    
    class Meta:
        db_table = 'data_categories'
        verbose_name_plural = 'Data categories'
        
    def __str__(self):
        return self.name


class DataSharingRequest(models.Model):
    """Request from partner to access user data"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
        ('revoked', 'Revoked'),
    ]
    
    request_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='data_requests')
    partner = models.ForeignKey('partners.Partner', on_delete=models.CASCADE)
    
    # Request details
    requested_data_categories = models.ManyToManyField(DataCategory)
    purpose = models.TextField()
    purpose_code = models.CharField(max_length=50)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField()
    
    class Meta:
        db_table = 'data_sharing_requests'
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.partner.name} → {self.user.username}"
    
    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timezone.timedelta(days=7)
        super().save(*args, **kwargs)


class ConsentRecord(models.Model):
    """User's consent for data sharing"""
    
    consent_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    request = models.OneToOneField(DataSharingRequest, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Consent details
    consented_data_categories = models.ManyToManyField(DataCategory)
    consent_given = models.BooleanField(default=False)
    consent_duration_days = models.IntegerField(default=7)
    max_access_count = models.IntegerField(default=10)
    
    # Access control
    access_token = models.CharField(max_length=128, unique=True, blank=True)
    token_expires_at = models.DateTimeField()
    
    # Usage tracking
    access_count = models.IntegerField(default=0)
    last_accessed_at = models.DateTimeField(null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'consent_records'
        
    def __str__(self):
        return f"Consent {self.consent_id}"
    
    def save(self, *args, **kwargs):
        if not self.access_token:
            self.access_token = secrets.token_urlsafe(64)
        if not self.token_expires_at:
            self.token_expires_at = timezone.now() + timezone.timedelta(days=self.consent_duration_days)
        super().save(*args, **kwargs)
    
    def is_valid(self):
        """Check if consent is still valid"""
        if not self.is_active or self.revoked_at:
            return False
        if timezone.now() > self.token_expires_at:
            return False
        if self.access_count >= self.max_access_count:
            return False
        return True
    
    def revoke(self, reason="User requested"):
        """Revoke consent"""
        self.is_active = False
        self.revoked_at = timezone.now()
        self.save()