from django.urls import path
from . import views
from .views  import *



urlpatterns = [
    
        path('chat_list/', chatlist, name='chatlist'),
        
]