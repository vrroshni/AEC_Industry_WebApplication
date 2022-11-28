from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser#staff status true
from .models import *
from user_app.serializers import *
from rest_framework import status
from django.contrib.auth.hashers import make_password


# Create your views here.
@api_view(['GET'])
def index(request):
    routes=[
        "HELLO"
    ]
    return Response(routes)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['username'] = user.username
    #     token['user_id'] = user.id
    #     # ...
    #     return token
    def validate(self,attrs):
        print(attrs,'atttrrrr')
        data=super().validate(attrs)
        print(data)
        serializer=ProfileSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v                                                                                                                 
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# ------------------------------ for user needs ------------------------------ #
# @api_view(['POST'])
# def registerUser(request):
#     data=request.data
#     user=AccountSerializer(data=data)
#     if user.is_valid():
#             user.save()
#             return Response(user.data,status=status.HTTP_201_CREATED)
#     else:
#             return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    try:
        if Account.objects.filter(username=data['username']).exists():
            message = {'detail': 'User with this username already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        if Account.objects.filter(email=data['email']).exists():
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        Account.objects.create_user(
            first_name=data['firstname'],
            last_name=data['lastname'],
            username=data['username'],
            phone_number=data['phonenumber'],
            email=data['email'],
            password=data['password']
        )
        return Response(status=status.HTTP_201_CREATED)
    except:
        message ={'detail':"error"} 
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



        

@api_view(['POST'])
def profileVerification(request):
    data = request.data
    print(data)
    try:
        # if ProfileVerification.objects.filter(username=data['username']).exists():
        #     message = {'detail': 'User with this username already exists'}
        #     return Response(message, status=status.HTTP_400_BAD_REQUEST)
        # if Account.objects.filter(email=data['email']).exists():
        #     message = {'detail': 'User with this email already exists'}
        #     return Response(message, status=status.HTTP_400_BAD_REQUEST)
        ProfileVerification.objects.create_user(
            first_name=data['firstname'],
            last_name=data['lastname'],
            username=data['username'],
            phone_number=data['phonenumber'],
            email=data['email'],
            password=data['password']
        )
        return Response(status=status.HTTP_201_CREATED)
    except:
        message ={'detail':"error"} 
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer=ProfileSerializer(user,many=False)
    return Response(serializer.data)




@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    user=request.user
    print(user,'i am ......................')
    serializer=ProfileSerializerWithToken(user,many=False)
    data=request.data
    user.first_name=data['first_name']
    user.last_name=data['last_name']
    user.username=data['username']
    user.email=data['email']
    user.phone_number=data['phone_number']
    if data['password']!='':
        user.password=make_password(data['password'])
    user.save()
    return Response(serializer.data)