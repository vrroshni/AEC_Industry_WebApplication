from django.urls import re_path,path
from .consumers import *

websocket_urlpatterns = [
    path('ws/<int:my_id>/<int:receiver_id>/',PersonalChatConsumer.as_asgi())

]