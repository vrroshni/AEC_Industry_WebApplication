from django.db import models
from user_app.models import Account,Network
from aec_app.models import Post

# Create your models here.




class ChatMessages(models.Model):
    
    thread_name = models.CharField(max_length=100,null=True)  #unique channel name for the two users to communicate.
    sender = models.ForeignKey(Account,related_name='sender',on_delete=models.CASCADE,null=True)  #the one who send the message.
    receiver = models.ForeignKey(Account,related_name='reciever',on_delete=models.CASCADE,null=True)  #one who will get the message.
    message=  models.CharField(max_length=200,null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    
    
class Notifications(models.Model):
    message_receiver = models.ForeignKey(Account,related_name='notify_receiver',on_delete=models.CASCADE,null=True) #the  one who will get the notification.
    message_sender = models.ForeignKey(Account,related_name='notify_sender',on_delete=models.CASCADE,null=True)  #one who made the action.
    notification_text = models.TextField()
    thread_name = models.CharField(max_length=120,null=True,blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)
    notify_count = models.IntegerField(default=0)
    post_notification=models.ForeignKey(Post,related_name='notify_post',on_delete=models.CASCADE,null=True)  
    network_notification=models.ForeignKey(Network,related_name='notify_network',on_delete=models.CASCADE,null=True)
    notification_of=models.CharField(max_length=120,null=True,blank=True)


