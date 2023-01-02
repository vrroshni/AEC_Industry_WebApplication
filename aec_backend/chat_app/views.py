from django.shortcuts import render
from user_app.models import Account
from user_app.serializers import AccountSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from rest_framework import status




# Create your views here.

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def chatlist(request):
    user=request.user
    chatlist=Account.objects.exclude(id=user.id)
    chatSerializer=AccountSerializer(chatlist,many=True)
    return Response(chatSerializer.data,status=status.HTTP_201_CREATED)
