from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import redirect
from .models import ShortenedURL
from .serializers import ShortenedURLSerializer

class CreateShortenedURLView(generics.CreateAPIView):
    queryset = ShortenedURL.objects.all()
    serializer_class = ShortenedURLSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

class RedirectToOriginalURL(generics.RetrieveAPIView):
    queryset = ShortenedURL.objects.all()
    lookup_field = 'short_code'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return redirect(instance.original_url)