from django.urls import path

from . import views

urlpatterns = [
    path('SearchResult/', views.SearchResult),
    path('index/', views.index, name='index'),
    path('musics/', views.musics, name='musics'),
]