from rest_framework import serializers
from .models import DataSharingRequest, ConsentRecord, DataCategory

class DataCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCategory
        fields = ['code', 'name', 'description']

class DataSharingRequestSerializer(serializers.ModelSerializer):
    partner_name = serializers.CharField(source='partner.name', read_only=True)
    requested_data_categories = DataCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = DataSharingRequest
        fields = ['request_id', 'partner_name', 'purpose', 'requested_data_categories',
                 'status', 'created_at', 'expires_at']

class ConsentApprovalSerializer(serializers.Serializer):
    consented_categories = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of category codes to consent"
    )
    duration_days = serializers.IntegerField(min_value=1, max_value=90, default=7)
    max_access_count = serializers.IntegerField(min_value=1, max_value=100, default=10)

class ConsentRecordSerializer(serializers.ModelSerializer):
    partner_name = serializers.CharField(source='request.partner.name', read_only=True)
    consented_data_categories = DataCategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = ConsentRecord
        fields = ['consent_id', 'partner_name', 'consent_given', 'consented_data_categories',
                 'access_count', 'max_access_count', 'is_active', 'token_expires_at']