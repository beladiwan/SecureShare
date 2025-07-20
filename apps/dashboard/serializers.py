from rest_framework import serializers

class DashboardStatsSerializer(serializers.Serializer):
    active_consents = serializers.IntegerField()
    pending_requests = serializers.IntegerField()
    recent_activity = serializers.IntegerField()
    privacy_score = serializers.IntegerField()