from django.contrib import admin
from .models import AccessLog

@admin.register(AccessLog)
class AccessLogAdmin(admin.ModelAdmin):
    list_display = ('log_id', 'user', 'partner', 'action', 'success', 'created_at')
    list_filter = ('action', 'success', 'created_at')
    search_fields = ('user__username', 'partner__name')
    readonly_fields = ('log_id', 'created_at')
    
    def has_add_permission(self, request):
        return False  # Logs should only be created programmatically
    
    def has_delete_permission(self, request, obj=None):
        return False  # Logs should never be deleted