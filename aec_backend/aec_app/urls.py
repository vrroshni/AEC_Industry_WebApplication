from django.urls import path
from . import views
from .views  import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
    path('',index),
    #JWT
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('tokenrefresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #UserProfile
    path('register/', registerUser, name='register'),
    path('profile/', getUserProfile, name='profile'),
    path('otheruserprofile/', otherUserProfile, name='otheruserprofile'),
    path('updateprofile/', updateUserProfile, name='updateprofile'),
    
    path('userrequest/', getUserRequest, name='userrequest'),
    path('profileverification/', profileVerification, name='profileverification'),
    path('topremium/', toPremiumMember, name='topremium'),
    path('create-checkout-session/<price>/', csrf_exempt(CreateCheckOutSession.as_view()), name='checkout_session'),    
    
    path('addpost/', addPost, name='addpost'),
    path('allfeed/', allFeed, name='allfeed'),
    path('suggestions/', suggestions, name='suggestions'),
    
]