

# Create your views here.
from django.shortcuts import render

def background_music(request):
    return render(request, "backgroundmusic/music.html")
def page4(request):
    return render(request, "page4.html")
def page6(request):
    return render(request, 'page6.html')
def page5(request):
    return render(request, 'page5.html')
def cake(request):
    return render(request, "cake.html")
def home4(request):
    return render(request, "home4.html")
def gopher(request):
    return render(request, "gopher.html")
def sidescroll(request):
    return render(request, "sidescroll.html")
def page(request):
    return render(request, "page.html")
def page2(request):
    return render(request, "page2.html")
def page1(request):
    return render(request, "page1.html")
def page3(request):
    return render(request, "page3.html")
def page7(request):
    return render(request, "page7.html")