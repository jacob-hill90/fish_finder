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
            zipcode=int(json.loads(request.body)['zipcode']),
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

@api_view(['POST'])
def new_catch(request):
    user = AppUser.objects.get(id = request.user.id )
    print('>>>>>>>>>>>>>>>>>>>>>>>>>>>USER',user)
    print('>>>>>>>Dan print>>>', request.data)
    new_catch_data = request.data
    #SEASON ISN'T SUBMITTED from form to 
    try:
        new_catch = CatchData.objects.create(
            owner=user,
            date=new_catch_data['date'],
            season=new_catch_data['season'],
            species=new_catch_data['species'], 
            weight=new_catch_data['weight'], 
            fishing_method=new_catch_data['fishing_method'], 
            length=new_catch_data['length'], 
            latitude=new_catch_data['latitude'],
            longitude=new_catch_data['longitude'])

        print(new_catch.date,new_catch.owner)
    except Exception as e:
        return JsonResponse({'status': str(e)})

    #owner = user.id; 
    # new_catch = CatchData(date = )
    return JsonResponse({'status': 'working on it'})

@api_view(['POST'])
def update_catch(request):

    # pulling out user deatails and assigning the email to username for good measure
    try:
        edited_catch = CatchData.objects.get(id=request.data['id'])
        edited_catch.date = request.data['date']
        edited_catch.fishing_method = request.data['fishing_method']
        edited_catch.length = request.data['length']
        edited_catch.season = request.data['season']
        edited_catch.species = request.data['species']
        edited_catch.weight = request.data['weight']
        edited_catch.catch_picture = request.data['catch_picture']
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

            # creating new user
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
        print('>>>>>>>>>>>>>>>>>>>>>>>>>>>', data)
        edited_catch = CatchData.objects.filter(
            owner_id=request.user.id).values().get(id=request.data['id'])
        # edited_catch = CatchData(**data)
        # edited_catch.save()

        # file_name = '../static/catch_picture/'
        return JsonResponse({'status': 'Catch updated succesfully'})
    if request.method == 'DELETE':
        delete_catch = CatchData.objects.get(id = request.data['id'])
        # delete_catch.delete()
        return JsonResponse({'status': 'Catch deleted succesfully'})


######################---EDIT USER---#######################
@api_view (['POST', 'DELETE'])
def edit_user(request):
    if request.method == 'POST':    
        try:
            user = AppUser.objects.get(id = request.user.id)
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']
            user.state = request.data['state']
            user.zipcode = request.data['zipcode']
            user.profile_picture = request.data['profile_picture']
            user.save()
            # error handling
        except Exception as e:
            print(str(e))
            return JsonResponse({'status': str(e)})
        return JsonResponse({'status': 'User details updated succesfully'})
    if request.method == 'DELETE': 
        try:
            user = AppUser.objects.get(id = request.user.id)
            # user.delete()
        # error handling
        except Exception as e:
            # print(str(e))
            return JsonResponse({'status': str(e)})
        return JsonResponse({'status': 'Account deleted succesfully'})

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
