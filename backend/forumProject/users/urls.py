from django.urls import path
from .views import UserHandling

urlpatterns = [
    path('register/', UserHandling.register, name='register'),
    path('signin/', UserHandling.signin, name='signin'),
]
