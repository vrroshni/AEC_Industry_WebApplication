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
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



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
        user.is_active = not user.is_active
        user.save()
        return Response(status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def profileVerified(request):
    try:
        data=request.data
        userrequest=ProfileVerification.objects.get(id=data['id'])
        userrequest.is_verified=True
        userrequest.save()

        user=Account.objects.get(id=userrequest.user.id)
        user.is_verified=True
        user.status=userrequest.role
        user.save()

        return Response(status=status.HTTP_200_OK)
    except Exception:
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
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allPosts(request):
    try:
        allposts=Post.objects.all().order_by('-posted_at')
        serializer=PostSerializer(allposts,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def changeReportStatus(request):
    data=request.data
    try:
        post=Post.objects.get(id=data['id'])
        post.reported_status = not post.reported_status
        post.save()
        return Response(status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
    



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allClientRequirements(request):
    try:
        requests=Client_Requests.objects.filter(status='PENDING')
        requestsSerializer=Client_RequestSerializer(requests,many=True)
        return Response(requestsSerializer.data,status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def requirementShared(request):
    try:
        data=request.data
        requests=Client_Requests.objects.get(id=data['id'])
        if profiles := ProfileVerification.objects.filter(
            is_premium=True,
            role=requests.role,
            experience=requests.experience,
            location=requests.location,
        ):
            for x in profiles:
                share=Proposals_Admin()
                share.proposal_from=requests.request_from
                share.proposal=requests
                share.eligible=x.user
                share.save()
                requests.status='SHARED'
                requests.save()
            message = {'detail': "Proposal is Shared to Respective Profiles"}
            return Response(message, status=status.HTTP_201_CREATED)
        else:
            requests.status='REJECTED'
            requests.is_rejected=True
            requests.save()
            message = {'detail': "No Matching profiles Found,So it is rejected"}
            return Response(message, status=status.HTTP_200_OK)

    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def requirementRejected(request):
    try:
        data=request.data
        requests=Client_Requests.objects.get(id=data['id'])
        requests.status='REJECTED'
        requests.is_rejected=True
        requests.save()
        return Response(status=status.HTTP_200_OK)
    except Exception:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)