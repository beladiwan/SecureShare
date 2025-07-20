from rest_framework import serializers
from apps.consent.models import ConsentRecord


class DataAccessSerializer(serializers.Serializer):
    """Serializer for partner data access requests"""
    access_token = serializers.CharField(required=True, min_length=32)
    purpose = serializers.CharField(required=False, max_length=200)
    

class ConsentRevokeSerializer(serializers.Serializer):
    """Serializer for consent revocation"""
    consent_id = serializers.UUIDField(required=True)
    reason = serializers.CharField(required=False, max_length=500, default="User requested")


class HealthCheckSerializer(serializers.Serializer):
    """Health check response"""
    status = serializers.CharField()
    timestamp = serializers.DateTimeField()
    version = serializers.CharField()
    service = serializers.CharField()


class UserStatsSerializer(serializers.Serializer):
    """User statistics response"""
    lifetime_stats = serializers.DictField()
    current_stats = serializers.DictField()
    top_partners = serializers.ListField()
    privacy_preferences = serializers.DictField()