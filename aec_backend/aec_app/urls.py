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
    path('profileverification/', profileVerification, name='profileverification'),
    path('profile/update/', updateUserProfile, name='updateprofile'),



]