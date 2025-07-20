from django.contrib import admin
from .models import DataCategory, DataSharingRequest, ConsentRecord

@admin.register(DataCategory)
class DataCategoryAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'sensitivity_level')

@admin.register(DataSharingRequest)
class DataSharingRequestAdmin(admin.ModelAdmin):
    list_display = ('request_id', 'user', 'partner', 'status', 'created_at')
    list_filter = ('status', 'created_at')

@admin.register(ConsentRecord)
class ConsentRecordAdmin(admin.ModelAdmin):
    list_display = ('consent_id', 'user', 'consent_given', 'is_active', 'access_count')
    list_filter = ('consent_given', 'is_active')
    readonly_fields = ('access_token',)