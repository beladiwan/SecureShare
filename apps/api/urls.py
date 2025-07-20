from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.consent.views import ConsentViewSet
from apps.audit.views import AuditLogViewSet
from apps.dashboard.views import DashboardView
from .views import (
    DataAccessView, 
    HealthCheckView,
    PartnerDataAccessView,
    RevokeConsentView,
    UserStatsView
)

# Create router for viewsets
router = DefaultRouter()
router.register(r'consent', ConsentViewSet, basename='consent')
router.register(r'audit', AuditLogViewSet, basename='audit')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
    
    # Authentication endpoints
    path('auth/', include('apps.accounts.urls')),
    
    # Data access endpoints
    path('data-access//', DataAccessView.as_view(), name='data-access'),
    path('partner/data-access/', PartnerDataAccessView.as_view(), name='partner-data-access'),
    
    # Consent management
    path('consent/revoke/', RevokeConsentView.as_view(), name='revoke-consent'),
    
    # Dashboard and stats
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('stats/', UserStatsView.as_view(), name='user-stats'),
    
    # Utility endpoints
    path('health/', HealthCheckView.as_view(), name='health-check'),
]