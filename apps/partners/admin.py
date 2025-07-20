from django.contrib import admin
from .models import Partner

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'partner_type', 'is_active', 'created_at')
    list_filter = ('partner_type', 'is_active')
    search_fields = ('name', 'registration_number')
    readonly_fields = ('partner_id', 'api_key', 'api_secret', 'created_at', 'updated_at')