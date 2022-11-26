from django.db.models.signals import pre_save
from user_app.models import Account



def updateUserDetails(sender,instance,**kwargs):
    user=instance
    user.full_name=user.first_name+' '+user.last_name
    print( user.full_name,'fullllllllllllllllllllllll')
pre_save.connect(updateUserDetails,sender=Account)