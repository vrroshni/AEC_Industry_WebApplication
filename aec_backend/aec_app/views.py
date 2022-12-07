from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # staff status true
from .models import *
from user_app.serializers import *
from rest_framework import status
from django.contrib.auth.hashers import make_password


# Create your views here.
@api_view(['GET'])
def index(request):
    all_comments=Post_Comment.objects.all().order_by('-created_at')     
    posts=Post.objects.all().order_by('-posted_at')
    allcomments_serializer=PostCommentSerializer(all_comments,many=True)
    serializer=PostSerializer(posts,many=True)
    if allcomments_serializer.is_valid:
        return Response({'allcomments':allcomments_serializer.data},status=status.HTTP_201_CREATED)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token['username'] = user.username
    #     token['user_id'] = user.id
    #     # ...
    #     return token
    def validate(self, attrs):
        print(attrs, 'atttrrrr')
        data = super().validate(attrs)
        print(data)
        serializer = ProfileSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# ------------------------------ for user needs ------------------------------ #
@api_view(['POST'])
def registerUser(request):
    data = request.data
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
        message = {'detail': "Your Profile is not registered"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def profileVerification(request):
    data = request.data
    try:
        user=Account.objects.get(id=data['user'])
        profile=ProfileVerification.objects.create(
            user=user,
            location=data['location'],
            experience=data['experience'],
            certificate=data['certificate'],
            cv=data['cv'],
            description=data['description'],

            id_proof=data['id_proof'],
            portfolio_website=data['website'],
            date_of_birth=data['dob'],
            verif_send_status=True,
            role=data['role']
        )
        serializer=ProfileVerificationSerializer(profile,many=False)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    except:
        message ={'detail':"Something went wrong"} 
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserRequest(request):
    user = request.user
    try:
        data=ProfileVerification.objects.get(user=user.id)
        serializer = ProfileVerificationSerializer(data, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': "Currently no requests"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    try:
        serializer = ProfileSerializerWithToken(user, many=False)
        data = request.data
        if Account.objects.exclude(id=user.id).filter(username=data['username']).exists():
            message = {'detail': 'User with this username already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        if Account.objects.exclude(id=user.id).filter(email=data['email']).exists():
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


        user.first_name = data['firstname']
        user.last_name = data['lastname']
        user.username = data['username']
        user.email = data['email']
        user.phone_number = data['phonenumber']
        if data['password'] != '':
            user.password = make_password(data['password'])
        if data['pro_pic'] != '':
            user.pro_pic = data['pro_pic']
        if data['cover_pic'] != '':
            user.cover_pic = data['cover_pic']
        user.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPost(request):
    user = request.user
    data = request.data
    try:
        post=Post()
        post.user=user
        if data['post_desc'] != '':
            post.post_desc = data['post_desc']
        if data['image'] != '':
            post.post_content_img = data['image']
        if data['video'] != '':
            post.post_content_video = data['video']
        post.save()
        posts=Post.objects.all().order_by('-posted_at')
        serializer=PostSerializer(posts,many=True)
        if serializer.is_valid:
            return Response(serializer.data,status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allFeed(request):
    try:
        all_reactions=Post_Reaction.objects.all().order_by('-reacted_at')     
        all_comments=Post_Comment.objects.all().order_by('-created_at') 
        all_reply_comments=Post_Comment_Reply.objects.all().order_by('-created_at')     
        posts=Post.objects.all().order_by('-posted_at')
        
        reaction_serializer=PostReactionSerializer(all_reactions,many=True)
        replycomment_serializer=PostComment_Reply_Serializer(all_reply_comments,many=True)
        allcomments_serializer=PostCommentSerializer(all_comments,many=True)
        serializer=PostSerializer(posts,many=True)
       
        return Response({'allposts':serializer.data,'allreactions':reaction_serializer.data,'allcomments':allcomments_serializer.data,'allreplies':replycomment_serializer.data},status=status.HTTP_201_CREATED)
        
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)