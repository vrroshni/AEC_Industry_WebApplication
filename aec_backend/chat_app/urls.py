from django.urls import path
from . import views
from .views  import *



urlpatterns = [
    
        path('chat_list/', chatlist, name='chatlist'),
        path('chat_messages/', chatMessages, name='chat_messages'),
        path('add_to_chat/', addtoChat, name='addtoChat'),
        path('show_notifications/', notifications, name='show_notifications'),
        
]