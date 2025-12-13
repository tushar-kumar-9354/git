

# Create your views here.
from django.shortcuts import render

def background_music(request):
    return render(request, "backgroundmusic/music.html")
def home(request):
    return render(request, "home.html")
def home2(request):
    return render(request, 'home2.html')
def home3(request):
    return render(request, 'home3.html')
def cake(request):
    return render(request, "cake.html")
def home4(request):
    return render(request, "home4.html")
def home0(request):
    return render(request, "home0.html")