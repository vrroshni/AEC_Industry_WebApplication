from django.urls import path
from . import views
from .views  import *
urlpatterns = [
   path('allUsers/',allusers,name='allusers'),
   path('statuschange/',statusChange,name='statuschange'),
   path('profileverified/',profileVerified,name='profileverified'),
   path('profilerejected/',profileRejected,name='profilerejected'),
   path('allprofile_verification_requests/',allProfileVerificationRequests.as_view(),name='allprofile_verification_requests'),

]