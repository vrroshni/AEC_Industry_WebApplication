from django.shortcuts import render
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from aec_app.models import *
from .serializers import *
from django.shortcuts import redirect
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


# Create your views here.

def toNotify_Post_Consumer(userId, receiverId, notify_text,notification_of,post):
    print('its to notifyyyyyyyyyyy')
    room_name = f'collection_{receiverId}'
    room_group_name = f'notifications_{room_name}'
    notify_sender = Account.objects.get(id=userId)
    notify_receiver = Account.objects.get(id=receiverId)
    Notifications.objects.create(
            thread_name=room_group_name,notification_text=notify_text, message_sender=notify_sender, message_receiver=notify_receiver,notification_of=notification_of,post_notification=post)
    count=Notifications.objects.filter(message_receiver=receiverId,is_seen=False).count()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            "type": "send.notifications",
            'count':count
        }
    )
    
def toNotify_Network_Consumer(userId, receiverId, notify_text,notification_of,network):
    room_name = f'collection_{receiverId}'
    room_group_name = f'notifications_{room_name}'
    notify_sender = Account.objects.get(id=userId)
    notify_receiver = Account.objects.get(id=receiverId)
    Notifications.objects.create(
            thread_name=room_group_name,notification_text=notify_text, message_sender=notify_sender, message_receiver=notify_receiver,notification_of=notification_of,network_notification=network)
    count=Notifications.objects.filter(message_receiver=receiverId,is_seen=False).count()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            "type": "send.notifications",
            'count':count
        }
    )
    
def toDeleteNotify_Network_Consumer(userId, receiverId,network):
    room_name = f'collection_{receiverId}'
    room_group_name = f'notifications_{room_name}'
    notify_sender = Account.objects.get(id=userId)
    notify_receiver = Account.objects.get(id=receiverId)
    notify=Notifications.objects.filter(
            message_sender=notify_sender, message_receiver=notify_receiver,network_notification=network).first()
    notify.delete()
    count=Notifications.objects.filter(message_receiver=receiverId,is_seen=False).count()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            "type": "delete.notifications",
            'count':count
        }
    )
    
def toDeleteNotify_Post_Consumer(userId, receiverId, notify_text,notification_of,post):
    room_name = f'collection_{receiverId}'
    room_group_name = f'notifications_{room_name}'
    notify_sender = Account.objects.get(id=userId)
    notify_receiver = Account.objects.get(id=receiverId)
    notify=Notifications.objects.filter(
            thread_name=room_group_name,notification_text=notify_text, message_sender=notify_sender, message_receiver=notify_receiver).first()
    notify.delete()
    count=Notifications.objects.filter(message_receiver=receiverId,is_seen=False).count()
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        room_group_name,
        {
            "type": "delete.notifications",
            'count':count
        }
    )
    



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def like_post(request):
    user = request.user
    data = request.data
    post = Post.objects.get(id=data['id'])
    notification_text = f"{user.username} liked your post"

    like_filter = Post_Reaction.objects.filter(user=user, post=post).first()
    if like_filter is None:
        new_like = Post_Reaction.objects.create(
            post=post, user=user, type='LIKE')
        new_like.save()
        post.likes = post.likes+1
        post.save()
        toNotify_Post_Consumer(user.id, post.user.id, notification_text,"like",post)
    elif dislike_filter := Post_Reaction.objects.filter(
        user=user, post=post, type='DISLIKE'
    ).first():
        dislike_filter.delete()
        post.dislikes = post.dislikes-1
        post.likes = post.likes+1
        post.save()
        new_like = Post_Reaction.objects.create(
            post=post, user=user, type='LIKE')
        new_like.save()
        async_to_sync(toNotify_Post_Consumer(user.id, post.user.id, notification_text,"like",post))
    else:
        
        like_filter.delete()
        post.likes = post.likes-1
        post.save()
        async_to_sync(toDeleteNotify_Post_Consumer(user.id, post.user.id, notification_text,"like",post))
    posts = Post.objects.all().order_by('-posted_at')
    serializer = PostSerializer(posts, many=True)
    if serializer.is_valid:
        return Response({'allposts': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def dislike_post(request):
    user = request.user
    data = request.data
    post = Post.objects.get(id=data['id'])
    notification_text = f"{user.username} liked your post"

    dislike_filter = Post_Reaction.objects.filter(user=user, post=post).first()

    if dislike_filter is None:
        new_like = Post_Reaction.objects.create(
            post=post, user=user, type='DISLIKE')
        new_like.save()
        post.dislikes = post.dislikes+1
        post.save()
    elif like_filter := Post_Reaction.objects.filter(
        user=user, post=post, type='LIKE'
    ).first():
        like_filter.delete()
        post.likes = post.likes-1
        post.dislikes = post.dislikes+1
        post.save()
        new_dislike = Post_Reaction.objects.create(
            post=post, user=user, type='DISLIKE')
        new_dislike.save()
        async_to_sync(toDeleteNotify_Post_Consumer(user.id, post.user.id, notification_text,"like",post))
    else:
        dislike_filter.delete()
        post.dislikes = post.dislikes-1
        post.save()
    posts = Post.objects.all().order_by('-posted_at')
    serializer = PostSerializer(posts, many=True)
    if serializer.is_valid:
        return Response({'allposts': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def follow_unfollow(request):
    user = request.user
    data = request.data
    notification_text = f"{user.username} started following you "

    follower = Account.objects.get(id=data['user_id'])
    if exist_network := Network.objects.filter(
        followed_to=follower, followed_by=user
    ).first():
        delete_follower = Network.objects.get(
            followed_to=follower, followed_by=user)
        user.following -= 1
        follower.followers -= 1
        user.save()
        follower.save()
        async_to_sync(toDeleteNotify_Network_Consumer(user.id, follower.id,exist_network))
        delete_follower.delete()
    else:
        new_follower = Network.objects.create(
            followed_to=follower, followed_by=user)
        new_follower.is_follow = True
        user.following += 1
        follower.followers += 1
        user.save()
        follower.save()
        new_follower.save()
        async_to_sync(toNotify_Network_Consumer(user.id,follower.id, notification_text,"followed",new_follower))
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_commented(request):
    user = request.user
    data = request.data
    notification_text = f"{user.username} commented on your post"

    post = Post.objects.get(id=data['post_id'])
    post.comments += 1
    post.save()
    new_comment = Post_Comment.objects.create(
        user=user, post=post, comment_desc=data['comment'])
    new_comment.save()
    async_to_sync(toNotify_Post_Consumer(user.id,post.user.id, notification_text,'commented',post))
    posts = Post.objects.all().order_by('-posted_at')
    serializer = PostSerializer(posts, many=True)
    if serializer.is_valid:
        return Response({'allposts': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_reply_commented(request):
    user = request.user
    data = request.data
    post = Post.objects.get(id=data['post_id'])
    post.comments += 1
    post.save()
    comment = Post_Comment.objects.get(id=data['comment_id'])
    new_comment_reply = Post_Comment_Reply.objects.create(
        user=user, post=post, post_comment=comment, reply_comment_desc=data['comment'])
    new_comment_reply.save()
    posts = Post.objects.all().order_by('-posted_at')
    serializer = PostSerializer(posts, many=True)
    if serializer.is_valid:
        return Response({'allposts': serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def send_connection(request):
    user = request.user
    data = request.data
    notification_text=f"{user.username} sent you a connection request"
    connection = Account.objects.get(id=data['user_id'])
    if exist_ := Network.objects.filter(
        followed_to=connection, followed_by=user
    ).first():
        exist_.is_connect = False
        exist_.connect_status = 'PENDING'
        exist_.save()
        async_to_sync(toNotify_Network_Consumer(user.id,data['user_id'],notification_text,'connection_request',exist_))
    else:
        new_connection = Network.objects.create(
            followed_to=connection, followed_by=user)
        new_connection.is_follow = True
        new_connection.is_connect = False
        new_connection.connect_status = 'PENDING'
        user.following += 1
        connection.followers += 1
        user.save()
        connection.save()
        new_connection.save()
        async_to_sync(toNotify_Network_Consumer(user.id,data['user_id'], notification_text,'connection_request',new_connection))

    return Response(status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def accept_connection(request):
    user = request.user
    data = request.data
    notification_text_delete=f"{user.username} sent you a connection request"

    notification_text=f"{user.username} accepted your  connection request"

    connection = Network.objects.get(id=data['network_id'])
    connection.is_connect = True
    connection.connect_status = 'CONNECTED'
    user.connections += 1
    user.following += 1
    user.save()
    connection.save()
    connected_user = Account.objects.get(id=connection.followed_by.id)
    connected_user.followers += 1
    connected_user.save()
    async_to_sync(toNotify_Network_Consumer(user.id,connected_user.id, notification_text,'connection_accepted',connection))
    notify=Notifications.objects.filter(
            message_sender=user.id, message_receiver=connected_user.id,notification_text=notification_text_delete,network_notification=connection).first()
    print(notify,'gggggggggg')
    notify.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def reject_connection(request):
    user = request.user
    data = request.data
    connection = Network.objects.get(id=data['network_id'])
    connection.is_rejected = True
    connection.save()
    async_to_sync(toDeleteNotify_Network_Consumer(user.id,connection.followed_by.id,connection))

    return Response(status=status.HTTP_200_OK)


# def like_post(request):
#     pass

# def like_post(request):
#     pass
