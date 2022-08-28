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
    profile_picture = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)


class CatchData(models.Model):
    date = models.DateField()
    season = models.CharField(max_length=20)
    species = models.CharField(max_length=100)
    weight = models.PositiveIntegerField()
    fishing_method =  models.CharField(max_length=100)
    length = models.PositiveIntegerField()
    latitude = models.PositiveBigIntegerField(null=True)
    longitude = models.PositiveBigIntegerField(null=True)
    catch_picture = models.ImageField(null=True, blank=True, upload_to='catch_pictures' )
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='catches')

class FishDB(models.Model):
    name = models.CharField(max_length=100)
    latin_name = models.CharField(max_length=100)
    fish_record = models.CharField(max_length=100, null=True)
    fish_docs = models.TextField()
    fish_pic = models.CharField(max_length=100)

