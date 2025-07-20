from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.partners.models import Partner
from apps.consent.models import DataSharingRequest, ConsentRecord, DataCategory

User = get_user_model()


class DataAccessAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        # Create test partner
        self.partner = Partner.objects.create(
            name='Test Insurance',
            partner_type='insurance',
            registration_number='TEST123'
        )
        
        # Create data categories
        self.income_category = DataCategory.objects.create(
            code='income_range',
            name='Income Range',
            description='Income bracket'
        )
        
    def test_health_check(self):
        """Test health check endpoint"""
        response = self.client.get('/api/v1/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')
    
    def test_unauthorized_data_access(self):
        """Test data access without valid token"""
        response = self.client.get('/api/v1/data-access/invalid-token/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_user_stats_requires_auth(self):
        """Test that user stats requires authentication"""
        response = self.client.get('/api/v1/stats/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)