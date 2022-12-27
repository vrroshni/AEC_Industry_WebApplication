
from django.conf import settings
from django.core.mail import send_mail
from user_app.models import *
from user_app.serializers import AccountSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.cache import cache
from django.shortcuts import redirect
import uuid,random
from django.contrib.auth.hashers import make_password,check_password






def verify_account_after_registration(user,otp,token):
    subject = 'Your accounts need to be verified'
    message = f'Hi  verify your account either with this OTP {otp} or by clicking this link {settings.SITE_URL}email_verify/{token}'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user.email]
    send_mail(subject, message , email_from ,recipient_list )
    return


@api_view(['PATCH'])
def otp_verify(request):
    try:
        data = request.data
        print(data['userid'],'kkkkkkkkkkk')
        user=Account.objects.get(id=data['userid'])
        print( user.otp,'ooooooooooooooooo')
        if user.is_email_verified:
            message = {'detail': "You account is already Verified"}
            return Response(message, status=status.ok)
        if check_password(data['otp'],user.otp):
            user.is_email_verified=True
            user.save()
            message = {'detail': "You account is  Verified"}
            return Response(message, status=status.HTTP_200_OK)
        else:
            message = {'detail': "Enter Valid OTP"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['PATCH'])
def resend_verification_credentials(request):
    try:
        data = request.data
        user=Account.objects.get(id=data['userid'])
        if cache.get(user.email):
            message = {'detail': f'Try after {cache.ttl(user.email)} seconds'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        auth_token = str(uuid.uuid4())
        otp=random.randint(1000,9999)
        user.otp=make_password(str(otp))
        user.email_token=make_password(auth_token)
        user.save()
        cache.set(user.email,f'{otp}{auth_token}',timeout=60)
        print(cache.get(user.email),'jhkllllllllllllllll')
        verify_account_after_registration(user,otp,auth_token)
        return Response( status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def email_verify(request):
    try:
        data=request.data
        if profile_obj := Account.objects.get(id=data['userid']):
            if profile_obj.is_email_verified:
                message = {'detail': "Your Account is already verified!"}
                return Response(message, status=status.HTTP_200_OK)
            if check_password(data['token'],profile_obj.email_token):
                profile_obj.is_email_verified = True
                profile_obj.save()
                message = {'detail': "Your Account is verified!"}
                return Response(message, status=status.HTTP_200_OK)
            message = {'detail': "Click on valid Link"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def registereduser(request,id):
    user=Account.objects.get(id=id)
    userserializer=AccountSerializer(user)
    return Response(userserializer.data,status=status.HTTP_200_OK)

    
    