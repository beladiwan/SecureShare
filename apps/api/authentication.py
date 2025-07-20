from datetime import timezone
from rest_framework import authentication
from rest_framework import exceptions
from apps.partners.models import Partner


class PartnerAuthentication(authentication.BaseAuthentication):
    """Custom authentication for partners using API key"""
    
    def authenticate(self, request):
        # Get API key from header
        api_key = request.META.get('HTTP_X_API_KEY')
        
        if not api_key:
            return None
        
        try:
            partner = Partner.objects.get(api_key=api_key, is_active=True)
        except Partner.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid API key')
        
        # Verify API secret if provided
        api_secret = request.META.get('HTTP_X_API_SECRET')
        if api_secret and partner.api_secret != api_secret:
            raise exceptions.AuthenticationFailed('Invalid API credentials')
        
        # Update last request timestamp
        partner.last_request_at = timezone.now()
        partner.save(update_fields=['last_request_at'])
        
        return (None, partner)  # No user, just partner
    
    def authenticate_header(self, request):
        return 'ApiKey'


class OptionalJWTAuthentication(authentication.BaseAuthentication):
    """JWT authentication that doesn't fail if no token provided"""
    
    def authenticate(self, request):
        from rest_framework_simplejwt.authentication import JWTAuthentication
        
        try:
            jwt_auth = JWTAuthentication()
            return jwt_auth.authenticate(request)
        except:
            return None