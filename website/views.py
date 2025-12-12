

# Create your views here.
from django.shortcuts import render

def background_music(request):
    return render(request, "backgroundmusic/music.html")
def home(request):
    return render(request, "home.html")