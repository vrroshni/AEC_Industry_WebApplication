from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from aec_app.models import *
from .serializers import*
from django.shortcuts import redirect



# Create your views here.

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def like_post(request):
    user=request.user
    data=request.data
    post=Post.objects.get(id=data['id'])
    like_filter=Post_Reaction.objects.filter(user=user,post=post).first()
    if like_filter == None:
        new_like=Post_Reaction.objects.create(post=post,user=user,type='LIKE')
        new_like.save()
        post.likes=post.likes+1
        post.save()
    else:
        dislike_filter=Post_Reaction.objects.filter(user=user,post=post,type='DISLIKE').first()
        if dislike_filter:
            dislike_filter.delete()
            post.dislikes=post.dislikes-1
            post.likes=post.likes+1
            post.save()
            new_like=Post_Reaction.objects.create(post=post,user=user,type='LIKE')
            new_like.save()
            
        else:
            like_filter.delete()
            post.likes=post.likes-1
            post.save()
    posts=Post.objects.all().order_by('-posted_at')
    serializer=PostSerializer(posts,many=True)
    if serializer.is_valid :
        return Response({'allposts':serializer.data},status=status.HTTP_201_CREATED)
            
            
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def dislike_post(request):
    user=request.user
    data=request.data
    post=Post.objects.get(id=data['id'])
    dislike_filter=Post_Reaction.objects.filter(user=user,post=post).first()

    if dislike_filter == None:
        new_like=Post_Reaction.objects.create(post=post,user=user,type='DISLIKE')
        new_like.save()
        post.dislikes=post.dislikes+1
        post.save()
    else:
        like_filter=Post_Reaction.objects.filter(user=user,post=post,type='LIKE').first()
        if like_filter:
            like_filter.delete()
            post.likes=post.likes-1
            post.dislikes=post.dislikes+1
            post.save()
            new_dislike=Post_Reaction.objects.create(post=post,user=user,type='DISLIKE')
            new_dislike.save()
        else:
            dislike_filter.delete()
            post.dislikes=post.dislikes-1
            post.save()
    posts=Post.objects.all().order_by('-posted_at')
    serializer=PostSerializer(posts,many=True)
    if serializer.is_valid :
        return Response({'allposts':serializer.data},status=status.HTTP_201_CREATED)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def follow_unfollow(request):
    user=request.user
    data=request.data
    follower=Account.objects.get(id=data['user_id'])
    if Network.objects.filter(followed_to=follower,followed_by=user).first():
        delete_follower=Network.objects.get(followed_to=follower,followed_by=user)
        user.following-=1
        follower.followers-=1
        user.save()
        follower.save()
        delete_follower.delete() 
        
    else:
        new_follower=Network.objects.create(followed_to=follower,followed_by=user)
        new_follower.is_follow=True
        user.following+=1
        follower.followers+=1
        user.save()
        follower.save()
        new_follower.save()
    serializer = ProfileSerializer(user, many=False)    
    return Response(serializer.data)

 
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_commented(request):
    user=request.user
    data=request.data
    post=Post.objects.get(id=data['post_id'])
    post.comments+=1
    post.save()
    new_comment=Post_Comment.objects.create(user=user,post=post,comment_desc=data['comment'])
    new_comment.save()
    posts=Post.objects.all().order_by('-posted_at')
    serializer=PostSerializer(posts,many=True)
    if serializer.is_valid :
        return Response({'allposts':serializer.data},status=status.HTTP_201_CREATED)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_reply_commented(request):
    user=request.user
    data=request.data
    post=Post.objects.get(id=data['post_id'])
    post.comments+=1
    post.save()
    comment=Post_Comment.objects.get(id=data['comment_id'])
    new_comment_reply=Post_Comment_Reply.objects.create(user=user,post=post,post_comment=comment,reply_comment_desc=data['comment'])
    new_comment_reply.save()
    posts=Post.objects.all().order_by('-posted_at')
    serializer=PostSerializer(posts,many=True)
    if serializer.is_valid :
        return Response({'allposts':serializer.data},status=status.HTTP_201_CREATED)
 
 
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def send_connection(request):
    user=request.user
    data=request.data
    connection=Account.objects.get(id=data['user_id'])
    exist_=Network.objects.filter(followed_to=connection,followed_by=user).first()
    if exist_:
        exist_.is_connect=False
        exist_.connect_status='PENDING'
        exist_.save()
        return Response(status=status.HTTP_200_OK)
    else:
        new_connection=Network.objects.create(followed_to=connection,followed_by=user)
        new_connection.is_follow=True
        new_connection.is_connect=False
        new_connection.connect_status='PENDING'
        user.following+=1
        connection.followers+=1
        user.save()
        connection.save()
        new_connection.save()
        return Response(status=status.HTTP_200_OK)
 
        
               
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_connection(request):
    user=request.user
    data=request.data
    connection=Network.objects.get(id=data['connection_id'])
    connection.is_connect=True
    connection.connect_status='CONNECTED'
    user.connections+=1
    user.following+=1
    user.save()
    connection.save()
    connected_user=Account.objects.get(id=connection.followed_by.id)
    connected_user.followers+=1
    connected_user.save()
    return Response(status=status.HTTP_200_OK)

 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_connection(request):
    user=request.user
    data=request.data
    connection=Network.objects.get(id=data['connection_id'])
    connection.is_rejected= True
    connection.save()
    return Response(status=status.HTTP_200_OK)


    
    
        
        
    
    
    
    
    
    
    
    
    
    
    

# def like_post(request):
#     pass

# def like_post(request):
#     pass