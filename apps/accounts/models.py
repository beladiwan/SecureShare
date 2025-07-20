from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    """Extended User model for Canara SecureShare"""
    
    user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    phone_number = models.CharField(max_length=17, blank=True)
    canara_account_number = models.CharField(max_length=20, blank=True)
    
    # Verification
    email_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    kyc_verified = models.BooleanField(default=False)
    
    # Privacy preferences
    privacy_mode = models.CharField(
        max_length=20,
        choices=[
            ('strict', 'Strict'),
            ('balanced', 'Balanced'),
            ('permissive', 'Permissive')
        ],
        default='balanced'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        
    def __str__(self):
        return f"{self.username} ({self.email})"