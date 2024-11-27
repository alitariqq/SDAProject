from rest_framework import generics
from .models import Post
from .viewPost import PostSerializer

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer