from django.db import models
from user_app.models import Account

# Create your models here.


class ChatModel(models.Model):
    thread_name = models.CharField(max_length=100,null=True,blank=True)  #unique channel name for the two users to communicate.
    sender = models.ForeignKey(Account,related_name='sender',on_delete=models.CASCADE)  #the one who send the message.
    reciever = models.ForeignKey(Account,related_name='reciever',on_delete=models.CASCADE)  #one who will get the message.


class ChatMessages(models.Model):
    thread=models.ForeignKey(ChatModel,related_name='chat_thread',on_delete=models.CASCADE,null=True)
    message=  models.CharField(max_length=200,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)