from django.urls import path
from . import views

urlpatterns = [
    path("music/", views.background_music, name="background_music"),
    path("", views.home0, name="home0"),
    path("home", views.home, name="home"),
    path('home2/', views.home2, name='home2'),
    path('home3/', views.home3, name='home3'),
    path('cake/', views.cake, name='cake'),
    path('home4/', views.home4, name='home4'),
]
