from django.urls import path
from .views import UserHandling,modifyUser

urlpatterns = [
    path('register/', UserHandling.register, name='register'),
    path('signin/', UserHandling.signin, name='signin'),
    path('session/', UserHandling.session_check, name='session_check'),
    path('logout/', UserHandling.logout, name='logout'),
    path('updateUser/',modifyUser.updateUser, name='updateUser')
]
