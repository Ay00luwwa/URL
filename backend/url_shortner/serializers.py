from rest_framework import serializers
from .models import ShortenedURL

class ShortenedURLSerializer(serializers.ModelSerializer):
    short_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortenedURL
        fields = ['original_url', 'short_code', 'short_url']
        read_only_fields = ['short_code', 'short_url']

    def get_short_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/{obj.short_code}')

    def create(self, validated_data):
        validated_data['short_code'] = ShortenedURL.generate_short_code()
        return super().create(validated_data)