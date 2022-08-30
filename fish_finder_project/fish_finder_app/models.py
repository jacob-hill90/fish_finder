from django.db import models
from django.contrib.auth.models import AbstractUser


def fish_upload_path(instance, filename):
    return '/'.join(['fish_picture', str(instance.owner), filename])


def profile_upload_path(instance, filename):
    return '/'.join(['profile_picture', str(instance.username), filename])


class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
    )
    username = models.CharField(max_length=100, null=False, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=11)
    state = models.CharField(max_length=2)
    profile_picture = models.ImageField(
        null=True, upload_to=profile_upload_path)
    is_active = models.BooleanField(default=True)


class CatchData(models.Model):
    date = models.DateField()
    season = models.CharField(max_length=20)
    species = models.CharField(max_length=100)
    weight = models.CharField(max_length=60, null=True)
    fishing_method = models.CharField(max_length=100)
    length = models.CharField(max_length=60, null=True)
    depth = models.PositiveIntegerField(null=True)
    latitude = models.CharField(max_length=30, null=True)
    longitude = models.CharField(max_length=30, null=True)
    catch_picture = models.ImageField(null=True, upload_to=fish_upload_path)
    notes = models.TextField(null=True)
    owner = models.ForeignKey(
        AppUser, on_delete=models.CASCADE, related_name='catches')


class FishDB(models.Model):
    name = models.CharField(max_length=100)
    latin_name = models.CharField(max_length=100)
    fish_record = models.CharField(max_length=100, null=True)
    fish_docs = models.TextField()
    fish_pic = models.CharField(max_length=100)
