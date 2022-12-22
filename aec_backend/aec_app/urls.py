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
    path('create-checkout-session/', csrf_exempt(CreateCheckOutSession.as_view()), name='checkout_session'),    
    path('stripepayment/', csrf_exempt(StripePaymentProposalBid.as_view()), name='stripepayment'),    
    
    path('addpost/', addPost, name='addpost'),
    path('allfeed/', allFeed, name='allfeed'),
    path('suggestions/', suggestions, name='suggestions'),
    
    path('connectus/', connectUs, name='connectus'),
    path('connectusrequests/', connectUsRequests, name='connectUsRequests'),
    path('proposalbids/', proposalBids, name='proposalbids'),
    path('accept_proposalbid/', accept_proposalBid, name='accept_proposalbid'),
    path('reject_proposalbid/', reject_proposalBid, name='reject_proposalbid'),
    
    
    
    #Premium
    path('adminproposals/', adminProposals, name='adminproposals'),
    path('adminproposals_accepted/', adminProposalsAccepted, name='adminProposalsAccepted'),
    path('adminproposals_rejected/', adminProposalsRejected, name='adminProposalsRejected'),
    path('adminproposals_onprocess/', adminProposalsOnprocess, name='adminProposalsOnprocess'),
    
    #proposalactions
    path('proposal_accepted/', proposal_accepted, name='proposal_accepted'),
    path('proposal_rejected/', proposal_rejected, name='proposal_rejected'),
    path('send_proposal/', send_proposal, name='send_proposal'),
    path('proposal_completed/', proposal_completed, name='proposal_completed'),

    
]