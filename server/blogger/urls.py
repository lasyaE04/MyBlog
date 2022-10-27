from django.urls import path, include
from blogger import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('blogs/', views.blog_list),
    path('blogs/<int:pk>/', views.blog_detail),
    path('authors/', views.author_list),
    path('authors/<int:pk>/', views.author_detail),
    path('allAuthors/', views.allAuthors),
    path('allAuthors/<int:pk>/', views.allAuthors_detail),
]