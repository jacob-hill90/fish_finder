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
    user = authenticate(username=json.loads(request.body)['username1'], password=json.loads(request.body)['password'])

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
    print(json.loads(request.body)['username'])
    if AppUser.objects.filter(username=json.loads(request.body)['username']).exists():
        return JsonResponse({'data': 'Username already taken'})
    return JsonResponse({'data': 'Username available'})


@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
<<<<<<< HEAD
        print(request.user.id)
        data = serializers.serialize("json", [request.user], fields=['id', 'email', 'username', 'first_name', 'last_name', 'zipcode', 'state', 'profile_picture'])
=======
        data = serializers.serialize("json", [request.user], fields=['username', 'first_name', 'last_name', 'email', 'state', 'zipcode', 'profile_picture'])
>>>>>>> d6fafafe29f13c28ea8f2c1c7efeca1717755679
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})


######################--- USER FISHTORY REQUEST---#######################

@api_view(['POST'])
def add_catch(request):
    # pulling out user deatails and assigning the email to username for good measure
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






@api_view(['GET', 'POST', 'DELETE'])
def catch(request):
    if request.method == 'GET':
        catches = CatchData.objects.filter(owner_id= request.user.id).values()
        data = list(catches)
        return JsonResponse({'data': data})
    if request.method == 'POST':
        # data = request.data

        data ={
            'catch_picture': dict(request.FILES)['catch_picture'],
            'date':dict(request.data)['date'][0],
            'id':dict(request.data)['id'][0],
            'length':dict(request.data)['length'][0],
            'owner_id':dict(request.data)['owner_id'][0],
            'season':dict(request.data)['season'][0],
            'species':dict(request.data)['species'][0],
            'weight':dict(request.data)['weight'][0],
            }
        print('>>>>>>>>>>>>>>>>>>>>>>>>>>>DATA',data)
        # edited_catch = CatchData.objects.filter(owner_id= request.user.id).values().get(id =dict(request.data)['id'][0])
        # edited_catch = CatchData(**data)
        # edited_catch.save()
        
        # edited_catch = CatchData.objects.filter(owner_id= request.user.id).values().get(id =request.data['data']['id'])
        # edited_catch = CatchData(**data)
        # edited_catch.save()

        # file_name = '../static/catch_picture/'
        return JsonResponse({'status': 'Catch updated succesfully'})
    if request.method == 'DELETE':
        delete_catch = CatchData.objects.get(id = request.data['id'])
        # delete_catch.delete()
        return JsonResponse({'status': 'Catch deleted succesfully'})


######################---EDIT USER---#######################
@api_view (['PUT', 'DELETE'])
def edit_user(request):
    if request.method == 'PUT':    
        user = AppUser.objects.get(id = request.user.id)
        user = AppUser(**request.data)
        # user.save()
        return JsonResponse({'status': 'User details updated succesfully'})
    if request.method == 'DELETE': 
        user = AppUser.objects.get(id = request.user.id)
        # user.delete()
        return JsonResponse({'status': 'Account deleted succesfully'})

######################---REQUEST WEATHER---#######################

@api_view(['GET'])
def weather_api(request, zipcode):

    apikey = os.environ['weather_api_key']

    API_response = requests.get(
        f'https://api.openweathermap.org/data/2.5/weather?zip={zipcode},US&apikey={apikey}&units=imperial')

    responseJSON = API_response.json()
    return JsonResponse(responseJSON)
