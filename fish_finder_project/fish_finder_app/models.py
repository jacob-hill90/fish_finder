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

class CatchData(models.Model):
    date = models.DateField()
    # location = 
    season = models.CharField(max_length=20)
    species = models.CharField(max_length=100)
    weight = models.PositiveIntegerField()
    fishingMethod =  models.CharField(max_length=100)
    length = models.PositiveIntegerField()
    photo = models.CharField(max_length=225)