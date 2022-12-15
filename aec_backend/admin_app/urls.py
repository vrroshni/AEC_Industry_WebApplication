from django.urls import path
from . import views
from .views  import *

urlpatterns = [
   path('allUsers/',allusers,name='allusers'),
   path('statuschange/',statusChange,name='statuschange'),

   path('allprofile_verification_requests/',allProfileVerificationRequests.as_view(),name='allprofile_verification_requests'),
   path('profileverified/',profileVerified,name='profileverified'),
   path('profilerejected/',profileRejected,name='profilerejected'),
   
   path('allPosts/',allPosts,name='allPosts'),
   path('changeReportStatus/',changeReportStatus,name='changeReportStatus'),
   
   
   path('allclient_requirements/',allClientRequirements,name='allClientRequirements'),
   path('requirement_rejected/',requirementRejected,name='requirementRejected'),
   path('requirement_shared/',requirementShared,name='requirementShared'),
   

]
