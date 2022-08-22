from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from django.core import serializers
import json
from .models import AppUser

# Create your views here.
def home_page(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


######################---USER--AUTH---#######################


#view for sign up
@api_view(['POST'])
def sign_up(request):


    #pulling out user deatails and assigning the email to username for good measure
    try:
        #creating new user
        AppUser.objects.create_user(
            first_name = json.loads(request.body)['first_name'], 
            last_name = json.loads(request.body)['last_name'],  
            zipcode = int(json.loads(request.body)['zipcode']), 
            state = json.loads(request.body)['state'], 
            username = json.loads(request.body)['username'], 
            email = json.loads(request.body)['email'], 
            password = json.loads(request.body)['password'])

    #error handling    
    except Exception as e:
        print('Signup Error!')
        print(str(e))
    #since the user just signed up successfully I am logging them in so they are logged in when   
    user = authenticate(username = json.loads(request.body)['username'], password = json.loads(request.body)['password'])
    login(request, user)
    #returning friendly message to be alerted to user
    return JsonResponse({'data': 'Account created successfully!'})


#login view
@api_view(['POST'])
def log_in(request):
    print(json.loads(request.body)['password'])
    #grabbing the values and then the user
    user = authenticate(username = json.loads(request.body)['username'], password = json.loads(request.body)['password'])
    
    #logging them in if they exist and are active user
    if user is not None:
        if user.is_active:
            try:
                login(request, user)
            except Exception as e:
                print('Login Error!')
                print(str(e))
    #friendly messages depending on outcome to be displayed to user in an alert
            return JsonResponse({'data': 'Successfully logged in!'})
        else:
            return JsonResponse({'data': 'User not active!'})
    else:
        return JsonResponse({'data': 'No user!'}) 


#signout view, pretty self explanatory
@api_view(['POST'])
def sign_out(request):
    logout(request)
    return JsonResponse({'data': 'User logged out!'})

@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['username', 'first_name', 'last_name'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user': None})