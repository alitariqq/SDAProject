from django.urls import path
from .views import UserHandling
from .views import PostCreateView
from .views import UserHandling,modifyUser
from .views import PostCreateView

urlpatterns = [
    path('register/', UserHandling.register, name='register'),
    path('signin/', UserHandling.signin, name='signin'),
    path('forms2/', PostCreateView.as_view(), name='post-create'),
    path('session/', UserHandling.session_check, name='session_check'),
    path('logout/', UserHandling.logout, name='logout'),
    path('updateUser/',modifyUser.updateUser, name='updateUser')
]
