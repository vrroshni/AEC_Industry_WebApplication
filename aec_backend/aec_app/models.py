from django.db import models
from user_app.models import*

# Create your models here.
class Post(models.Model):
    user=models.ForeignKey(Account,related_name='user_post',on_delete=models.CASCADE,null=True)
    post_desc=models.CharField(max_length=200,null=True)
    post_content_img=models.FileField(upload_to='img_posts',null=True)
    post_content_video=models.FileField(upload_to='video_posts',null=True)
    likes=models.IntegerField(default=0,null=True)
    dislikes=models.IntegerField(default=0,null=True)
    comments=models.IntegerField(default=0)
    no_of_reports=models.IntegerField(default=0,null=True)


    posted_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    is_edited= models.BooleanField(default=False)
    reported_status= models.BooleanField(default=False)


      
class Report_Post(models.Model):
    user=models.ForeignKey(Account,related_name='reported_user',on_delete=models.CASCADE,null=True)
    post=models.ForeignKey(Post,related_name='reported_post',on_delete=models.CASCADE,null=True)
    report_reason=models.CharField(max_length=200,null=True)
    reported_at=models.DateTimeField(auto_now_add=True)

class Post_Reaction(models.Model):
    TYPES=( 
        ('LIKE','LIKE'),
        ('DISLIKE','DISLIKE'),
            )
    post=models.ForeignKey(Post,related_name='post_reaction',on_delete=models.CASCADE,null=True)
    type=models.CharField(max_length=100, null=True,choices=TYPES)
    user=models.ForeignKey(Account,related_name='post_reaction_user',on_delete=models.CASCADE,null=True)
    reacted_at=models.DateTimeField(auto_now_add=True,null=True)

class Post_Comment(models.Model):
    
    user=models.ForeignKey(Account,related_name='user_post_comment',on_delete=models.CASCADE,null=True)
    post=models.ForeignKey(Post,related_name='post_comment',on_delete=models.CASCADE,null=True)
    comment_desc=models.CharField(max_length=200,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(null=True)
    is_edited= models.BooleanField(default=False)
    
    
class Post_Comment_Reply(models.Model):
    
    user=models.ForeignKey(Account,related_name='user_postcomment_reply',on_delete=models.CASCADE,null=True)
    post_comment=models.ForeignKey(Post_Comment,related_name='post_comment_reply',on_delete=models.CASCADE,null=True)
    reply_comment_desc=models.CharField(max_length=200,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)
    is_edited= models.BooleanField(default=False)






