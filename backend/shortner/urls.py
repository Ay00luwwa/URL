from django.contrib import admin
from django.urls import path
from url_shortner.views import CreateShortenedURLView, RedirectToOriginalURL

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/shorten/', CreateShortenedURLView.as_view(), name='create_short_url'),
    path('<str:short_code>/', RedirectToOriginalURL.as_view(), name='redirect_to_original'),
]