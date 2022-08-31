import string
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from django.core import serializers
import requests
import json
from dotenv import load_dotenv
import os
from .models import AppUser, FishDB, CatchData
import requests
import shutil

load_dotenv()


######################---INITIAL--VIEW---#######################


def home_page(request):
    theIndex = open('static/frontend/index.html').read()
    return HttpResponse(theIndex)


######################---FISH--DB---#######################


# view for pulling all fish from DB
@api_view(['get'])
def fish_db(request):
    # getting the recipes and sending back as json data
    data = list(FishDB.objects.all().values())
    return JsonResponse({'data': data})


# FishDB by ID
@api_view(['GET'])
def fishdb_byid(request):

    # getting fish id
    fish_id = request.GET.get('ID')

    # getting the fish and sending back as json data
    data = list(FishDB.objects.filter(id=fish_id).values())

    return JsonResponse({'data': data})


######################---USER--AUTH---#######################


# view for sign up
@api_view(['POST'])
def sign_up(request):
    # pulling out user deatails and assigning the email to username for good measure
    try:
        # creating new user
        AppUser.objects.create_user(
            first_name=json.loads(request.body)['first_name'],
            last_name=json.loads(request.body)['last_name'],
            zipcode=json.loads(request.body)['zipcode'],
            state=json.loads(request.body)['state'],
            username=json.loads(request.body)['username'],
            email=json.loads(request.body)['email'],
            password=json.loads(request.body)['password'])

    # error handling
    except Exception as e:
        return JsonResponse({'data': "server error -user already exists !"})

    # since the user just signed up successfully I am logging them in so they are logged in when
    user = authenticate(username=json.loads(request.body)[
                        'username'], password=json.loads(request.body)['password'])
    login(request, user)
    # returning friendly message to be alerted to user
    return JsonResponse({'data': 'Account created successfully!'})


# login view
@api_view(['POST'])
def log_in(request):

    # grabbing the values and then the user
    user = authenticate(username=json.loads(request.body)[
                        'username1'], password=json.loads(request.body)['password'])

    # logging them in if they exist and are active user
    if user is not None:
        if user.is_active:
            try:
                login(request, user)
            except Exception as e:
                return JsonResponse({'data': str(e)})

    # friendly messages depending on outcome to be displayed to user in an alert
            return JsonResponse({'data': 'Successfully logged in!'})
        else:
            return JsonResponse({'data': 'User not active!'})
    else:
        return JsonResponse({'data': 'No user!'})


# signout view, pretty self explanatory
@api_view(['POST'])
def sign_out(request):
    logout(request)
    return JsonResponse({'data': 'User logged out!'})


# view to validate username uniqueness
@api_view(['POST'])
def username_validate(request):
    # print(json.loads(request.body)['username'])
    if AppUser.objects.filter(username=json.loads(request.body)['username']).exists():
        return JsonResponse({'data': 'Username already taken'})
    return JsonResponse({'data': 'Username available'})


@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['id', 'email', 'username', 'first_name', 'last_name', 'zipcode', 'state', 'profile_picture'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})


######################--- USER FISHTORY REQUEST---#######################
# adding a new catch entry to the database
@api_view(['POST'])
def new_catch(request):
    user = AppUser.objects.get(id=request.user.id)
    try:
        new_catch = CatchData.objects.create(
            owner = user,
            date = request.data['date'],
            season = request.data['season'],
            species = request.data['species'],
            weight = request.data['weight'],
            fishing_method = request.data['fishing_method'],
            length = request.data['length'],
            latitude = request.data['latitude'],
            longitude = request.data['longitude'],
            catch_picture = request.data['catch_picture'],
            notes = request.data['notes'])
    except Exception as e:
        return JsonResponse({'status': str(e)})
    return JsonResponse({'status': 'New catch created succesfully'})


@api_view(['POST'])
def update_catch(request):
    # pulling out user deatails and assigning the email to username for good measure
    try:
        # checking if catch_picture is in the request, and if it also exists in the database
        def picture_control():
            if request.data['catch_picture']:
                    return request.data['catch_picture']
            else:
                if edited_catch.catch_picture:
                    return edited_catch.catch_picture
                else:
                    pass
        edited_catch = CatchData.objects.get(id=request.data['id'])
        edited_catch.date = request.data['date']
        edited_catch.fishing_method = request.data['fishing_method']
        edited_catch.length = request.data['length']
        edited_catch.season = request.data['season']
        edited_catch.species = request.data['species']
        edited_catch.weight = request.data['weight']
        edited_catch.notes = request.data['notes']
        edited_catch.catch_picture = picture_control()
        edited_catch.save()
    # error handling
    except Exception as e:
        # print(str(e))
        return JsonResponse({'status': str(e)})
    return JsonResponse({'status': 'Catch updated succesfully'})


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def catch(request):
    if request.method == 'GET':
        catches = CatchData.objects.filter(owner_id=request.user.id).values()
        data = list(catches)
        return JsonResponse({'data': data})
    if request.method == 'POST':
        # pulling out user and assigning to variable
        try:
            user = AppUser.objects.all().filter(username=request.data['owner'])[0]
            # creating new catch
            CatchData.objects.create(
            owner = user,
            date=request.data["date"],
            fishing_method=request.data['fishingMethod'],
            length=request.data['length'],
            season=request.data['season'],
            species=request.data['species'],
            weight=request.data['weight'],
            catch_picture=request.data['catch_picture'])
        # error handling
        except Exception as e:
            print(str(e))
            return JsonResponse({'data': str(e)})
        return JsonResponse({'data': 'Catch saved!'})
    if request.method == 'PUT':
        data = request.data
        edited_catch = CatchData.objects.filter(owner_id=request.user.id).values().get(id=request.data['id'])
        edited_catch = CatchData(**data)
        edited_catch.save()
        return JsonResponse({'status': 'Catch updated succesfully'})
    if request.method == 'DELETE':
        delete_catch = CatchData.objects.get(id = request.data['id'])
        delete_catch.delete()
        return JsonResponse({'status': 'Catch deleted succesfully'})


######################---EDIT USER---#######################

@api_view(['POST', 'DELETE'])
def edit_user(request):
    if request.method == 'POST':
        try:
            # checking if profile_picture is in the request, and if it also exists in the database
            def picture_control():
                if request.data['profile_picture']:
                    return request.data['profile_picture']
                else:
                    if user.profile_picture:
                        return user.profile_picture
                    else:
                        pass
            user = AppUser.objects.get(id=request.user.id)
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.state = request.data['state']
            user.zipcode = request.data['zipcode']
            user.profile_picture = picture_control()
            user.save()
            # error handling
        except Exception as e:
            print(str(e))
            return JsonResponse({'status': str(e)})
        return JsonResponse({'status': 'User details updated succesfully'})
    if request.method == 'DELETE':
        try:
            user = AppUser.objects.get(id=request.user.id)
            user.delete()
        # error handling
        except Exception as e:
            # print(str(e))
            return JsonResponse({'status': str(e)})
        return JsonResponse({'status': 'Account has been deleted'})


@api_view(['GET'])
def get_fish_data(request):
    fish_data = CatchData.objects.all()
    data = serializers.serialize("json", fish_data, fields=[
        "date", "season", "species", "weight", "fishing_method", "length", "depth", "latitude", "longitude", "catch_picture", "notes", "owner"])
    return JsonResponse({'data': data})


######################---REQUEST WEATHER---#######################

@api_view(['GET'])
def weather_api(request, zipcode):

    apikey = os.environ['weather_api_key']

    API_response = requests.get(
        f'https://api.openweathermap.org/data/2.5/weather?zip={zipcode},US&apikey={apikey}&units=imperial')

    responseJSON = API_response.json()
    return JsonResponse(responseJSON)


@api_view(['GET'])
def forecast_api(request, zipcode):

    apikey = os.environ['weather_api_key']

    API_response = requests.get(
        f'https://api.openweathermap.org/data/2.5/forecast?zip={zipcode},US&apikey={apikey}&units=imperial')

    responseJSON = API_response.json()
    return JsonResponse(responseJSON)
