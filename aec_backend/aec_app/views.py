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
    print(verified_profile, 'vvvvvvvvvv')
    return Response(status=status.HTTP_200_OK)


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
        posts = Post.objects.all().order_by('-posted_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except:
        message = {'detail': "Something went wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# class CreateStripeCheckOutSession(APIView):
#     def post(self,request,*args,**kwargs):
#         data=request.data
#         try:




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_checkout_session(request):
#     user = request.user
#     data = request.data
#     try:
#         verified_profile = ProfileVerification.objects.get(user=user)
#         checkout_session = stripe.checkout.Session.create(
#             line_items=[
#                 {
#                     # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                     'price_data': {
#                         'currency': 'usd',
#                         'unit_amount': int(data['premium_amount']) * 100,
#                         'product_data':{
#                             'name': "Premium Membership",
#                         }
#                     },
#                     'quantity': 1,
#                 },
#             ],
#             mode='payment',
#             success_url=settings.SITE_URL + '?success=true',
#             cancel_url=settings.SITE_URL + '?canceled=true',

#         )
#         verified_profile.premium_amount = data['premium_amount']
#         verified_profile.paid_at = datetime.now()
#         verified_profile.is_premium = True
#         verified_profile.save()
#         print(checkout_session.url, 'rullllllll')
#         return HttpResponseRedirect(checkout_session.url)
#     except:
#         return Response(
#             {'error': 'Something went wrong when creating stripe checkout session'},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# @app.route('/create-checkout-session', methods=['POST'])
# def create_checkout_session():
#     try:
#         checkout_session = stripe.checkout.Session.create(
#             line_items=[
#                 {
#                     # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
#                     'price': '{{PRICE_ID}}',
#                     'quantity': 1,
#                 }
#             ],
#             mode='payment',
#             success_url=YOUR_DOMAIN + '?success=true',
#             cancel_url=YOUR_DOMAIN + '?canceled=true',
#         )
#     except Exception as e:
#         return str(e)

#     return redirect(checkout_session.url, code=303)

# if __name__ == '__main__':
#     app.run(port=4242)

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
