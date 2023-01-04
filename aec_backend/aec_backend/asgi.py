"""
ASGI config for aec_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from django.urls import path
from channels.routing import ProtocolTypeRouter,URLRouter
from channels.auth import AuthMiddlewareStack
from chat_app.consumers import *
import chat_app.routing 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aec_backend.settings')

application = get_asgi_application()
application=ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AuthMiddlewareStack(
       URLRouter(
        chat_app.routing.websocket_urlpatterns
       ) 
    )
})