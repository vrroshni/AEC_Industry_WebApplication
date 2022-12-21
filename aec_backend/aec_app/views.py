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
from datetime import datetime
import stripe
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.views import APIView
import random


# Create your views here.
@api_view(['GET'])
def index(request):
    posts = Post.objects.all().order_by('-posted_at')
    serializer = PostSerializer(posts, many=True)
    if serializer.is_valid:
        return Response({'allposts': serializer.data}, status=status.HTTP_200_OK)


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
        user = Account.objects.get(id=data['user'])
        profile = ProfileVerification.objects.create(
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
        serializer = ProfileVerificationSerializer(profile, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckOutSession(APIView):
    def post(self, request, *args, **kwargs):
        price = self.kwargs["price"]
        try:
            checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': int(price) * 100,
                        'product_data':{
                            'name': "Premium Membership",
                        }
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=settings.SITE_URL + 'payment/?success=true&price='+price,
            cancel_url=settings.SITE_URL + 'payment/?canceled=true',

        )  
            return redirect(checkout_session.url)
        except Exception as e:
            return Response({'msg': 'something went wrong while creating stripe session', 'error': str(e)}, status=500)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toPremiumMember(request):
    user = request.user
    data = request.data
    verified_profile = ProfileVerification.objects.get(user=user)
    verified_profile.premium_amount = data['premium_amount']
    verified_profile.paid_at = datetime.now()
    verified_profile.is_premium = True
    verified_profile.save()
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, many=False)    
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def otherUserProfile(request):
    data = request.data
    user=Account.objects.get(id=data['id'])
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserRequest(request):
    user = request.user
    try:
        data = ProfileVerification.objects.get(user=user.id)
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
        serializer = ProfileSerializerWithToken(user, many=False)
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
        post = Post()
        post.user = user
        if data['post_desc'] != '':
            post.post_desc = data['post_desc']
        if data['image'] != '':
            post.post_content_img = data['image']
        if data['video'] != '':
            post.post_content_video = data['video']
        post.save()
        return Response(status=status.HTTP_201_CREATED)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allFeed(request):
    try:
        user=request.user
        #post suggestions
        posts = Post.objects.all().order_by('-posted_at')
        serializer = PostSerializer(posts, many=True)
        return Response({'allposts':serializer.data}, status=status.HTTP_201_CREATED)

    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def suggestions(request):
    try:
        user=request.user
        #user suggestions
        user_following=Network.objects.filter(followed_by=user)
        allusers=Account.objects.exclude(id=user.id).all()
        user_followings_list=[]
        
        
        for x in user_following:
            user_list=Account.objects.get(id=x.followed_to.id)
            user_followings_list.append(user_list)
        
        new_suggestion_list=[x for x in list(allusers) if (x not in list(user_followings_list))]
        random.shuffle(new_suggestion_list)
        userserializer=AccountSerializer(new_suggestion_list,many=True)
        return Response(userserializer.data, status=status.HTTP_201_CREATED)

    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def connectUs(request):
    data=request.data
    try:
        requests=NewClient_RequestSerializer(data=data,many=False)
        if requests.is_valid():
            requests.save()
            return Response(200)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def connectUsRequests(request):
    user=request.user
    try:
        requests=Client_Requests.objects.filter(request_from=user)
        requestsSerializer=Client_RequestSerializer(requests,many=True)
        return Response(requestsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def proposalBids(request):
    user=request.user
    try:
        proposalbids=Aec_Proposals_User.objects.filter(admin_proposal__proposal_from=user)
        proposalbidsSerializer=Aec_Proposals_UserSerializer(proposalbids,many=True)
        return Response(proposalbidsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def accept_proposalBids (request):
    user=request.user
    data = request.data
    try:
        proposal=Proposals_Admin.objects.get(id=data['id'],eligible=user)
        proposal.status='ACCEPTED'
        proposal.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



# ----------------------------- premiummembership ---------------------------- #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminProposals (request):
    user=request.user
    try:
        proposals=Proposals_Admin.objects.filter(eligible=user,status='PENDING')
        proposalsSerializer=Proposals_AdminSerializer(proposals,many=True)
        return Response(proposalsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminProposalsAccepted (request):
    user=request.user
    try:
        proposals=Proposals_Admin.objects.filter(eligible=user,status='ACCEPTED')
        proposalsSerializer=Proposals_AdminSerializer(proposals,many=True)
        return Response(proposalsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminProposalsRejected (request):
    user=request.user
    try:
        proposals=Proposals_Admin.objects.filter(eligible=user,is_accepted=False)
        proposalsSerializer=Proposals_AdminSerializer(proposals,many=True)
        return Response(proposalsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def adminProposalsOnprocess (request):
    user=request.user
    try:
        proposals=Proposals_Admin.objects.filter(eligible=user,is_accepted=True)
        proposalsSerializer=Proposals_AdminSerializer(proposals,many=True)
        return Response(proposalsSerializer.data,status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def proposal_accepted (request):
    user=request.user
    data = request.data
    try:
        proposal=Proposals_Admin.objects.get(id=data['id'],eligible=user)
        proposal.status='ACCEPTED'
        proposal.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def proposal_rejected (request):
    user=request.user
    data = request.data
    try:
        proposal=Proposals_Admin.objects.get(id=data['id'],eligible=user)
        proposal.delete()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_proposal (request):
        user=request.user
        data = request.data
        print(data)
        try:
            proposals=Proposals_Admin.objects.get(id=data['admin_proposal'],eligible=user)
            proposals.status='PROPOSAL_SENT'
            proposals.save()
            
            proposal_to_client=Aec_Proposals_UserSerializer(data=data,many=False)
            print(proposal_to_client)
            if proposal_to_client.is_valid():
                proposal_to_client.save()
                
            return Response(status=status.HTTP_200_OK)
        except:
            message = {'detail': "Something went wrong"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def proposal_completed (request):
    user=request.user
    data = request.data

    try:
        proposal=Proposals_Admin.objects.get(id=data['admin_proposal'],eligible=user)
        proposal.status="COMPLETED"
        proposal.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def proposal_completed_publish (request):
    user=request.user
    data = request.data

    try:
        proposal=Proposals_Admin.objects.get(id=data['admin_proposal'],eligible=user)
        proposal.status="COMPLETED"
        proposal.save()
        
        newproject=Projects.objects.create(user=user,project_title=data['project_title'],project_desc=data['project_desc'],project_image=data['project_image'],project_status='COMPLETED',project_client=proposal.proposal_from)
        newproject.save()
        
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_by_client (request):
    user=request.user
    data = request.data
    try:
        proposal=Aec_Proposals_User.objects.get(id=data['id'])
        proposal.is_accepted=True
        proposal.save()
        
        admin_proposal=Proposals_Admin.objects.get(id=proposal.admin_proposal)
        admin_proposal.is_accepted=True
        admin_proposal.save()
        return Response(status=status.HTTP_200_OK)
    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

