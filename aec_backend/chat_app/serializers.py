from chat_app.models import *
from rest_framework import serializers
from user_app.serializers import AccountSerializer,PostSerializer,NetworkSerializer

class Chat_MessageSerializer(serializers.ModelSerializer):
    sender=AccountSerializer(read_only=True)
    receiver=AccountSerializer(read_only=True)
    class Meta:
        model=ChatMessages
        fields='__all__'
        
class NotificationSerializer(serializers.ModelSerializer):
    message_receiver=AccountSerializer(read_only=True)
    message_sender=AccountSerializer(read_only=True)
    post_notification=PostSerializer(read_only=True)
    network_notification=NetworkSerializer(read_only=True)
    class Meta:
        model=Notifications
        fields='__all__'