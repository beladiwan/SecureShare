from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from apps.partners.models import Partner
from apps.consent.models import DataCategory, DataSharingRequest
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates demo data for testing'

    def handle(self, *args, **kwargs):
        # Create data categories
        categories = [
            {'code': 'income_range', 'name': 'Income Range', 'description': 'Income bracket information'},
            {'code': 'employment_status', 'name': 'Employment Status', 'description': 'Current employment details'},
            {'code': 'financial_stability', 'name': 'Financial Stability', 'description': 'Financial health score'},
            {'code': 'transaction_history', 'name': 'Transaction History', 'description': 'Banking transactions'},
        ]
        
        for cat in categories:
            DataCategory.objects.get_or_create(
                code=cat['code'],
                defaults={'name': cat['name'], 'description': cat['description']}
            )
        
        # Create demo user
        user, created = User.objects.get_or_create(
            username='priya.sharma',
            defaults={
                'email': 'priya.sharma@example.com',
                'first_name': 'Priya',
                'last_name': 'Sharma',
                'phone_number': '+919876543210',
                'canara_account_number': '12345678901234',
                'email_verified': True,
            }
        )
        
        if created:
            user.set_password('demo123')
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Created user: {user.username}'))
        
        # Create demo partner
        partner, created = Partner.objects.get_or_create(
            name='Canara HSBC Life Insurance',
            defaults={
                'partner_type': 'insurance',
                'registration_number': 'IRDA/2025/001',
                'contact_email': 'support@canarahsbc.com',
                'contact_phone': '+911234567890',
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created partner: {partner.name}'))
            self.stdout.write(self.style.WARNING(f'Partner API Key: {partner.api_key}'))
        
        # Create sample request
        request, created = DataSharingRequest.objects.get_or_create(
            user=user,
            partner=partner,
            defaults={
                'purpose': 'Term life insurance underwriting for ₹50 lakh coverage',
                'purpose_code': 'insurance_underwriting',
                'expires_at': timezone.now() + timedelta(days=7)
            }
        )
        
        if created:
            # Add requested categories
            request.requested_data_categories.add(
                *DataCategory.objects.filter(code__in=['income_range', 'employment_status', 'financial_stability'])
            )
            self.stdout.write(self.style.SUCCESS('Created sample data sharing request'))
        
        self.stdout.write(self.style.SUCCESS('Demo data created successfully!'))
        self.stdout.write(self.style.WARNING('\nTest Credentials:'))
        self.stdout.write(f'Username: priya.sharma')
        self.stdout.write(f'Password: demo123')
        self.stdout.write(f'\nPartner API Key: {partner.api_key}')