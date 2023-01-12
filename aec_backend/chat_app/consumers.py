import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import *
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from chat_app.serializers import NotificationSerializer



class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        send_user_id = self.scope['url_route']['kwargs']['my_id']
        receiver_id = self.scope['url_route']['kwargs']['receiver_id']

        if int(send_user_id) > int(receiver_id):
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
        sender_id = data['sender_id']
        receiver_id = data['receiver_id']
        await self.save_messages(self.room_group_name, message, sender_id, receiver_id)
        await self.chat_notifications(sender_id, receiver_id)
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
        if not ChatMessages.objects.filter(thread_name=thread_name).first():
            senderUser = Account.objects.get(id=sender)
            ReceiverUser = Account.objects.get(id=receiver)
            ChatMessages.objects.create(
                thread_name=thread_name, sender=senderUser, reciever=ReceiverUser)

    @database_sync_to_async
    def save_messages(self, thread_name, message, sender, receiver):
        senderUser = Account.objects.get(id=sender)
        receiverUser = Account.objects.get(id=receiver)
        print('kkkkkkkkooooooooooooooooooooo')
        ChatMessages.objects.create(
            thread_name=thread_name, message=message, sender=senderUser, receiver=receiverUser)
        
    @database_sync_to_async
    def chat_notifications(self,sender,receiver):
        senderUser = Account.objects.get(id=sender)
        receiverUser = Account.objects.get(id=receiver)
        notification_text=f"{senderUser.username} send you a message"
        room_name = f'collection_{receiverUser.id}'
        room_group_name = f'notifications_{room_name}'
        print('kkkkkkkkooooooooooooooooooooo')
        Notifications.objects.create(
            thread_name=room_group_name, notification_text=notification_text, message_sender=senderUser, message_receiver=receiverUser)

        channel_layer=get_channel_layer()
        async_to_sync (channel_layer.group_send)(
        room_group_name,{
            "type":"send_notifications",
            }
        )
        return
    

class NotificationConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        receiver_id = self.scope['url_route']['kwargs']['receiver_id']
        self.room_name = f'collection_{receiver_id}'
        self.room_group_name = f'notifications_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        
    async def disconnect(self,code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )   

    async def receive(self,text_data=None,bytes_data=None):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_notifications',

            }
        )

        # channel_layer=get_channel_layer()
        # async_to_sync (channel_layer.group_send)(
        # self.room_group_name,{
        #     "type":"send_notifications",
        #     }
        # ) 
        
    async def send_notifications(self,event):
        count = event['count']
        await self.send(text_data=json.dumps({
            'notification':"added",
            'count':count
            
        }))  
                
    async def delete_notifications(self,event):
        count = event['count']
        await self.send(text_data=json.dumps({
            'notification':"deleted",
            'count':count
        })) 
        
         
# class UpdateNotificationConsumer(AsyncWebsocketConsumer):
    
#     async def connect(self):
#         user_id = self.scope['url_route']['kwargs']['user_id']
#         self.room_name = f'my_collection_{user_id}'
#         self.room_group_name = f'notifications_of_{self.room_name}'
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         await self.accept()
       
#     async def disconnect(self,code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )   

#     async def receive(self,text_data=None,bytes_data=None):
#         data = json.loads(text_data)
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'send_notifications',

#             }
#         )

#         # channel_layer=get_channel_layer()
#         # async_to_sync (channel_layer.group_send)(
#         # self.room_group_name,{
#         #     "type":"send_notifications",
#         #     }
#         # ) 
        
#     async def send_notifications(self,event):
#         await self.send(text_data=json.dumps({
#             'notification':"added"
#         }))  
                
#     async def delete_notifications(self,event):
#         await self.send(text_data=json.dumps({
#             'notification':"deleted"
#         }))  
