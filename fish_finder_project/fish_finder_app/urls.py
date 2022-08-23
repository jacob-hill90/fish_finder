from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_page),
    path('sign_up', views.sign_up),
    path('log_in', views.log_in),
    path('sign_out', views.sign_out),
    path('whoami', views.who_am_i),
    path('catch', views.catch),
]
