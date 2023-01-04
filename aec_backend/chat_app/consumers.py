import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import *


class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        send_user_id = self.scope['url_route']['kwargs']['my_id']
        receiver_id = self.scope['url_route']['kwargs']['receiver_id']

        if int(send_user_id) > int(send_user_id):
            self.room_name = f'{send_user_id}_chatwith_{receiver_id}'
        else:
            self.room_name = f'{receiver_id}_chatwith_{send_user_id}'

        self.room_group_name = f'chat_room_of_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.create_thread(self.room_group_name, send_user_id, receiver_id)
        await self.accept()

    async def disconnect(self, code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_layer
        )

    async def receive(self, text_data=None, byte_data=None):
        data = json.loads(text_data)
        message = data['message']
        receiver_id = data['receiver_id']
        await self.save_messages(self.room_group_name, message)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'receiver_id': receiver_id

            }
        )

    async def chat_message(self, event):
        message = event['message']
        receiver_id = event['receiver_id']
        await self.send(text_data=json.dumps({
            'message': message,
            'receiver_id': receiver_id
        }))

    @database_sync_to_async
    def create_thread(self, thread_name, sender, receiver):
        chatexists = ChatModel.objects.filter(thread_name=thread_name).first()
        if not chatexists:
            senderUser = Account.objects.get(id=sender)
            ReceiverUser = Account.objects.get(id=receiver)
            ChatModel.objects.create(
                thread_name=thread_name, sender=senderUser, reciever=ReceiverUser)

    @database_sync_to_async
    def save_messages(self, thread_name, message):
        chat_thread = ChatModel.objects.get(thread_name=thread_name)
        ChatMessages.objects.create(thread=chat_thread, message=message)
