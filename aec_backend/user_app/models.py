from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.
# -------------------------------------------------------------------------------------------------------------------- #
#               the function defined inside this will manage the whole usercreation and superusercreation   
#               made this function for adding phone number field overriding default user table in django
# -------------------------------------------------------------------------------------------------------------------- #                            
#  to create/Register user                        
class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email,phone_number, password=None):
        if not email:
            raise ValueError('User must have an e-mail address')
        
        if not username:
            raise ValueError('User must have an Username')

        user = self.model(
            email       = self.normalize_email(email),
            username    = username,
            first_name  = first_name,
            last_name   = last_name,
            phone_number=phone_number
        )

        #password will be hashed in database
        user.set_password(password)
        user.save(using=self._db)
        return user

     #to create/Register superuser
    def create_superuser(self, first_name, last_name, username, email, password,phone_number):
        user = self.create_user(
            email      = self.normalize_email(email),
            username   = username,
            password   = password,
            first_name = first_name,
            last_name  = last_name,
            phone_number=phone_number,
            
        )
        user.is_admin   = True
        user.is_active  = True
        user.is_staff   = True
        user.is_superadmin  = True
        user.is_client=False
        user.save(using=self._db)
        return user



#Using AbstractBaseUser,build from scratch
#Changes is (bit dufficult)not possible after making first makemigrations
class Account(AbstractBaseUser):
    ROLE=(
        ('CLIENT','CLIENT'),
        ('ARCHITECT','ARCHITECT'),
        ('ENGINEER','ENGINEER'),
        ('CONSTRUCTOR','CONSTRUCTOR'),
            )
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    full_name       =models.CharField(max_length=50,null=True)
    username        = models.CharField(max_length=50, unique=True)
    email           = models.EmailField(max_length=100, unique=True)
    phone_number    = models.CharField(max_length=50,null=True)
    pro_pic         =models.FileField(upload_to='pro_pic',blank=True,null=True,default='/1.png')
    cover_pic       =models.FileField(upload_to='cover_pic',blank=True,null=True,default='/cover.jpg')
    referral_code   = models.CharField(max_length=50, null=True, blank=True)
    ref_active      = models.BooleanField(default=False ,null = True)
    code_reffered   = models.CharField(max_length=50, null=True, blank=True)
    followers       =models.IntegerField(default=0)
    following       =models.IntegerField(default=0)
    connections     =models.IntegerField(default=0)

 

    #Required fields
    status          =models.CharField(max_length=100, null=True,choices=ROLE,default="CLIENT")
    date_joined     = models.DateField(auto_now_add=True)  
    last_login      = models.DateTimeField(auto_now_add=True)  
    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_superadmin   = models.BooleanField(default=False) 
    is_client       =models.BooleanField(default=True)


    # -------------------------------------------------------------------------------------------------------------------- #
    #                                        username will be a credential to login,
    #    we cant change it by providing email field instead of username and then add username in required fields and remove email the same#
    # -------------------------------------------------------------------------------------------------------------------- #

    USERNAME_FIELD      = 'username'
    REQUIRED_FIELDS     = ['email', 'first_name', 'last_name','phone_number']

    objects = MyAccountManager()


    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None): 
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


class ProfileVerification(models.Model):
    user=models.ForeignKey(Account,related_name='user',on_delete=models.CASCADE)
    date=models.DateField(auto_now_add=True,null=True)
    location=models.CharField(max_length=50,null=True)
    description=models.CharField(max_length=500,null=True)
    portfolio_website=models.CharField(max_length=50,null=True)
    experience=models.IntegerField(default=0)
    date_of_birth=models.DateField(null=True)
    paid_at=models.DateField(null=True)
    role=models.CharField(max_length=50,null=True)

    
    verif_send_status=models.BooleanField(default=False)
    is_verified=models.BooleanField(default=False)
    is_premium=models.BooleanField(default=False)
    is_rejected=models.BooleanField(default=False)

    certificate=models.FileField(upload_to='certificates',null=True)
    cv=models.FileField(upload_to='cv',null=True)
    id_proof=models.FileField(upload_to='idproofs',null=True)

    def __str__(self):
        return self.user.username


class Network(models.Model):
    followed_to=models.ForeignKey(Account,related_name='user_network',on_delete=models.CASCADE,null=True)
    is_follow=models.BooleanField(default=False, null=True)
    is_connect=models.BooleanField(null=True)
    connect_status=models.CharField(max_length=100, null=True)
    followed_by=models.ForeignKey(Account,related_name='followed_by',on_delete=models.CASCADE,null=True)
    followed_at=models.DateTimeField(auto_now_add=True,null=True)
    is_rejected=models.BooleanField(null=True)
    
    def __str__(self):
        return self.followed_by.username



class Review_Rating(models.Model):
    rated_user=models.ForeignKey(Account,related_name='rated_user',on_delete=models.CASCADE,null=True)
    review_desc=models.CharField(max_length=200,null=True)
    rating=models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    
class Projects(models.Model):
    PROJECT_STATUS=(
        ('COMPLETED','COMPLETED'),
        ('PENDING','PENDING'),
            )
    user=models.ForeignKey(Account,related_name='user_project',on_delete=models.CASCADE,null=True)
    project_title=models.CharField(max_length=100,null=True)
    project_desc=models.CharField(max_length=200,null=True)
    project_image=models.FileField(upload_to='projects',null=True)
    project_status=models.CharField(max_length=100, null=True,choices=PROJECT_STATUS,default="PENDING")
    project_client=models.ForeignKey(Account,related_name='project_client_user',on_delete=models.CASCADE,null=True)
    review=models.ForeignKey(Review_Rating,related_name='review_project',on_delete=models.CASCADE,null=True)

    
    


    