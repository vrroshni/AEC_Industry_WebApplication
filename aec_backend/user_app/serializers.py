from rest_framework import serializers
from .models import *
from aec_app.models import *
from rest_framework_simplejwt.tokens import RefreshToken


# class AccountSerializer(serializers.ModelSerializer):

#     class Meta:
#         model=Account
#         fields=['i','username','first_name','last_name','email','phone_number','password']
#         extra_kwargs = {'password': {'write_only': True}}
#     is_active=serializers.BooleanField(default=True)
#     is_client=serializers.BooleanField(default=True)
#     def create(self, validated_data):
#         user = Account.objects.create(
#             username=validated_data["username"],
#             email=validated_data["email"],
#             first_name=validated_data["first_name"],
#             last_name=validated_data["last_name"],
#             phone_number=validated_data["phone_number"],
#             last_name=validated_data["last_name"],
#         )
#         user.set_password(validated_data["password"])
#         user.save()
#         return user
 


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields='__all__'




class ProfileSerializerWithToken(ProfileSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Account
        fields=['id','username','full_name','email','phone_number','followers','following','connections','is_client','is_superadmin','token','pro_pic','cover_pic']
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)


class ProfileVerificationSerializer(serializers.ModelSerializer):
    user=ProfileSerializer(read_only=True)
    
    class Meta:
        model=ProfileVerification
        fields='__all__'
    


# class PostSerializer(serializers.ModelSerializer):
#     user_post=ProfileSerializer(read_only=True)
#     class Meta:
#         model=Post
#         fields='__all__'
class PostReactionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post_Reaction
        fields = "__all__"
class PostCommentSerializer(serializers.ModelSerializer):
    user=ProfileSerializer(read_only=True)
    class Meta:
        model = Post_Comment
        fields = "__all__"
class PostComment_Reply_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Comment_Reply
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):    
    user=ProfileSerializer(read_only=True)
    class Meta:
        model=Post
        fields='__all__'