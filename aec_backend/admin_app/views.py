from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from rest_framework.decorators import api_view, permission_classes
from user_app.models import *
from user_app.serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework import  viewsets
from rest_framework.views import APIView





# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allusers(request):
    try:
        allusers=Account.objects.all()
        serializer=ProfileSerializer(allusers,many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def allProfileVerificationRequests(request):
#     try:
#         allrequests=ProfileVerification.objects.all()
#         serializer=ProfileVerificationSerializer(allrequests,many=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     except:
#         message = {'detail': "Something went wrong"}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)



class allProfileVerificationRequests(APIView):
    def get(self,request):
        allrequests=ProfileVerification.objects.filter(is_verified=False,is_rejected=False)
        serializer=ProfileVerificationSerializer(allrequests,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)





@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def statusChange(request):
    data=request.data
    try:
        user=Account.objects.get(id=data['id'])
        if user.is_active:
            user.is_active=False
            user.save()
        else:
            user.is_active=True
            user.save()
        return Response(status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def profileVerified(request):
    data=request.data
    try:
        userrequest=ProfileVerification.objects.get(id=data['id'])
        userrequest.is_verified=True
        userrequest.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def profileRejected(request):
    data=request.data
    try:
        userrequest=ProfileVerification.objects.get(id=data['id'])
        userrequest.is_rejected=True
        userrequest.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)




