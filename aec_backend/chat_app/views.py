from django.shortcuts import render
from user_app.models import Account
from user_app.serializers import AccountSerializer, Chat_MessageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from rest_framework import status
from .models import ChatMessages, ChatModel
from django.db.models import Q


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chatlist(request):
    try:
        user = request.user
        if chats := ChatModel.objects.filter(
            Q(sender=user.id) | Q(reciever=user.id)
        ):
            chat_list = set()
            for chat in chats:
                senderuser = Account.objects.get(id=chat.sender.id)
                receiveruser = Account.objects.get(id=chat.reciever.id)
                chat_list.add(senderuser)
                chat_list.add(receiveruser)

            otherusers = Account.objects.exclude(id=user.id).filter()
            chatted_users = [user for user in otherusers if user in chat_list]

            chatSerializer = AccountSerializer(chatted_users, many=True)
            return Response(chatSerializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chatMessages(request):
    user = request.user
    data = request.data
    other_user_id = data['receiver_id']
    if int(user.id) > int(other_user_id):
        room_name = f'{user.id}-{other_user_id}'
    else:
        room_name = f'{other_user_id}-{user.id}'
    thread = f'chat_room_of_{room_name}'
    chatmodel=ChatModel.objects.filter(thread_name=thread).first()
    print(chatmodel,'modellllllllllllll')
    if chatmodel:
        chat_messages = ChatMessages.objects.filter(thread=chatmodel.id)
        chatMessageSerializer = Chat_MessageSerializer(chat_messages, many=True)
        return Response(chatMessageSerializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addtoChat(request):
    user=request.user
    data = request.data
    receiver = data['receiver_id']
    if int(user.id) > int(receiver):
        room_name = f'{user.id}_chatwith_{receiver}'
    else:
        room_name = f'{receiver}_chatwith_{user.id}'
    thread = f'chat_room_of_{room_name}'
    chatexists=ChatModel.objects.filter(thread_name=thread).first()
    if not chatexists:
            ReceiverUser=Account.objects.get(id=receiver)
            ChatModel.objects.create(thread_name=thread,sender=user,reciever=ReceiverUser)
    return Response(status=status.HTTP_200_OK)
