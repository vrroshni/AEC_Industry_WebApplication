from django.urls import path
from . import views
from .views  import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('',index),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('tokenrefresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #UserProfile
    path('register/', registerUser, name='register'),
    path('profile/', getUserProfile, name='profile'),
    path('userrequest/', getUserRequest, name='userrequest'),
    path('profileverification/', profileVerification, name='profileverification'),
    path('updateprofile/', updateUserProfile, name='updateprofile'),
    path('addpost/', addPost, name='addpost'),
    path('allfeed/', allFeed, name='allfeed'),



]