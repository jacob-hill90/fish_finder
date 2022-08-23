from django.db import models
from django.contrib.auth.models import AbstractUser 


class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
    )
    username = models.CharField(max_length=100, null=False, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    zipcode = models.PositiveIntegerField()
    state = models.CharField(max_length=2)
    is_active = models.BooleanField(default=True)

class FishDB(models.Model):
    name = models.CharField(max_length=100)
    latin_name = models.CharField(max_length=100)
    fish_record = models.CharField(max_length=100, null=True)
    fish_docs = models.TextField()
    fish_pic = models.CharField(max_length=100)