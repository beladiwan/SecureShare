import secrets
import string
from django.core.mail import send_mail
from django.conf import settings

def generate_otp(length=6):
    """Generate OTP for verification"""
    return ''.join(secrets.choice(string.digits) for _ in range(length))

def send_consent_notification(user_email, partner_name, purpose):
    """Send email notification for consent request"""
    subject = f'Data Access Request from {partner_name}'
    message = f'{partner_name} has requested access to your data for {purpose}. Please log in to review.'
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user_email],
        fail_silently=True,
    )

def mask_email(email):
    """Mask email for privacy"""
    parts = email.split('@')
    if len(parts) != 2:
        return email
    
    username = parts[0]
    if len(username) <= 3:
        masked = username[0] + '*' * (len(username) - 1)
    else:
        masked = username[:2] + '*' * (len(username) - 4) + username[-2:]
    
    return f"{masked}@{parts[1]}"