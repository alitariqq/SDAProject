from django.urls import path
from .views import UserHandling
from .views import PostCreateView

urlpatterns = [
    path('register/', UserHandling.register, name='register'),
    path('signin/', UserHandling.signin, name='signin'),
    path('forms2/', PostCreateView.as_view(), name='post-create'),
]
