from django.urls import path
from . import views
from .views  import *



urlpatterns = [
        path('like_post/', like_post, name='like_post'),
        path('dislike_post/', dislike_post, name='dislike_post'),
        path('follow_unfollow/', follow_unfollow, name='follow_unfollow'),
        path('send_connection/', send_connection, name='send_connection'),
        path('accept_connection/', accept_connection, name='accept_connection'),
        path('reject_connection/', reject_connection, name='reject_connection'),

]