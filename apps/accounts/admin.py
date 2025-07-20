from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'phone_number', 'privacy_mode', 'is_active')
    list_filter = ('privacy_mode', 'email_verified', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('phone_number', 'canara_account_number', 'privacy_mode')
        }),
        ('Verification', {
            'fields': ('email_verified', 'phone_verified', 'kyc_verified')
        }),
    )