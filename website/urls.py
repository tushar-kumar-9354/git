from django.urls import path
from . import views

urlpatterns = [
    path("music/", views.background_music, name="background_music"),
    
    path("page4", views.page4, name="page4"),
    path('page6/', views.page6, name='page6'),
    path('page5/', views.page5, name='page5'),
    path('cake/', views.cake, name='cake'),
    
    path('page8/', views.page8, name='page8'),
    
    path('page2/', views.page2, name='page2'),
    path('', views.page1, name='page1'),
    path('page3/', views.page3, name='page3'),
    path('page7/', views.page7, name='page7'),
    path('page9/', views.page9, name='page9'),
]
