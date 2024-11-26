from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    username = models.CharField(max_length=150, unique=True, primary_key=True)  # Set as primary key
    email = models.EmailField(unique=True)
    dateOfBirth = models.DateField(null=False, default="2000-01-01")
    isVerified = models.BooleanField(default=False)

    def __str__(self):
        return self.username




class Post(models.Model):
    username = models.ForeignKey(CustomUser,to_field="username", on_delete=models.CASCADE, db_column="username")
    title=models.CharField(max_length=255)
    body=models.TextField()
    category=models.CharField(max_length=10)
    upvoteCount = models.IntegerField(null=True, default=0)
    downvoteCount = models.IntegerField(null=True,default=0)
    creationTime = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.title
    pass

class UpvotePosts(models.Model):
    username = models.ForeignKey(CustomUser,to_field="username", on_delete=models.CASCADE, db_column="username")
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, db_column="postId")

    class Meta:
        unique_together = ('username', 'postId')
        constraints = [
            models.UniqueConstraint(fields=['username', 'postId'], name='unique_upvote')
        ]

    def __str__(self):
        return f"{self.user.username} upvoted {self.post.title}"
    
class DownvotePosts(models.Model):
    username = models.ForeignKey(CustomUser,to_field="username", on_delete=models.CASCADE, db_column="username")
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, db_column="postId")

    class Meta:
        unique_together = ('username', 'postId')
        constraints = [
            models.UniqueConstraint(fields=['username', 'postId'], name='unique_downvote')
        ]

    def __str__(self):
        return f"{self.user.username} upvoted {self.post.title}"
    
class BookmarkPosts(models.Model):
    username = models.ForeignKey(CustomUser,to_field="username", on_delete=models.CASCADE, db_column="username")
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, db_column="postId")

    class Meta:
        unique_together = ('username', 'postId')
        constraints = [
            models.UniqueConstraint(fields=['username', 'postId'], name='unique_bookmark')
        ]

    def __str__(self):
        return f"{self.user.username} upvoted {self.post.title}"
    
class ReportPosts(models.Model):
    username = models.ForeignKey(CustomUser,to_field="username", on_delete=models.CASCADE, db_column="username")
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, db_column="postId")

    class Meta:
        unique_together = ('username', 'postId')
        constraints = [
            models.UniqueConstraint(fields=['username', 'postId'], name='unique_Report')
        ]

    def __str__(self):
        return f"{self.user.username} upvoted {self.post.title}"