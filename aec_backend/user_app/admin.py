from django.contrib import admin
from .models import *
from aec_app.models import *



# Register your models here.
admin.site.register(Account)
admin.site.register(ProfileVerification)
admin.site.register(Post_Reaction)
admin.site.register(Network)
admin.site.register(Post_Comment)
admin.site.register(Projects)
admin.site.register(Review_Rating) 
