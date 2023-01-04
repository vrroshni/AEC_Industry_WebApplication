from django.db import models
from user_app.models import Account

# Create your models here.




class ChatMessages(models.Model):
    
    thread_name = models.CharField(max_length=100,null=True)  #unique channel name for the two users to communicate.
    sender = models.ForeignKey(Account,related_name='sender',on_delete=models.CASCADE,null=True)  #the one who send the message.
    receiver = models.ForeignKey(Account,related_name='reciever',on_delete=models.CASCADE,null=True)  #one who will get the message.
    message=  models.CharField(max_length=200,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)