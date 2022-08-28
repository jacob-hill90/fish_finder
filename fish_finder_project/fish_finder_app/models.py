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
    profile_picture = models.CharField(max_length=150, null=True)
    is_active = models.BooleanField(default=True)


class CatchData(models.Model):
    date = models.DateField()
    season = models.CharField(max_length=20)
    species = models.CharField(max_length=100)
    weight = models.CharField(max_length=60, null=True)
    fishing_method =  models.CharField(max_length=100)
    length = models.CharField(max_length=60, null=True)
    depth = models.PositiveIntegerField(null=True)
    latitude = models.CharField(max_length=30, null=True)
    longitude = models.CharField(max_length=30, null=True)
    catch_picture = models.CharField(max_length=225, null=True)
    notes = models.TextField(null=True)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='catches')


class FishDB(models.Model):
    name = models.CharField(max_length=100)
    latin_name = models.CharField(max_length=100)
    fish_record = models.CharField(max_length=100, null=True)
    fish_docs = models.TextField()
    fish_pic = models.CharField(max_length=100)

