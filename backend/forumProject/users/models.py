from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    dateOfBirth = models.DateField(null=False, default="2000-01-01")
    isVerified = models.BooleanField(default=False)
    pass
