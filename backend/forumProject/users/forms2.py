from rest_framework import generics
from .models import Post
from .forms import PostSerializer
from .user import UserHandling,modifyUser,CustomUser
from .models import CustomUser

class PostCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def perform_create(self, serializer):
        predefined_username = self.request.user
        serializer.save(username=predefined_username)