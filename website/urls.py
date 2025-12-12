from django.urls import path
from . import views

urlpatterns = [
    path("music/", views.background_music, name="background_music"),
    path("", views.home, name="home"),
]
