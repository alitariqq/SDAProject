from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    dateOfBirth = models.DateField(null=False, default="2000-01-01")
    isVerified = models.BooleanField(default=False)
    pass


class Post(models.Model):
    username=models.CharField(max_length=200)
    title=models.CharField(max_length=255)
    body=models.TextField()
    category=models.CharField(max_length=10)

    def __str__(self):
        return self.title
    pass