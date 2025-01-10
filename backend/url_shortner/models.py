from django.db import models
import random
import string

class ShortenedURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @classmethod
    def generate_short_code(cls):
        characters = string.ascii_letters + string.digits
        short_code = ''.join(random.choice(characters) for _ in range(6))
        while cls.objects.filter(short_code=short_code).exists():
            short_code = ''.join(random.choice(characters) for _ in range(6))
        return short_code