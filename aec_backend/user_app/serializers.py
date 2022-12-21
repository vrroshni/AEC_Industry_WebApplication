from rest_framework import serializers
from .models import *
from aec_app.models import *
from rest_framework_simplejwt.tokens import RefreshToken

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields='__all__'

class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model=Network
        fields='__all__'
        
class ProjectsSerializer(serializers.ModelSerializer):
    rated_user=AccountSerializer(read_only=True)
    class Meta:
        model=Projects
        fields='__all__'
        


class ProfileSerializer(serializers.ModelSerializer):
    user_network=serializers.SerializerMethodField(read_only=True)
    user_project=serializers.SerializerMethodField(read_only=True)
    user_post=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Account
        fields='__all__'
        
    def get_user_network(self, obj):
        items = obj.user_network.all()
        serializer = NetworkSerializer(items, many=True)
        return serializer.data
    
    def get_user_post(self, obj):
        items = obj.user_post.all()
        serializer = PostSerializer(items, many=True)
        return serializer.data
    
    def get_user_project(self, obj):
        items = obj.user_project.all()
        serializer = ProjectsSerializer(items, many=True)
        return serializer.data
class PostSerializer(serializers.ModelSerializer):    
    user=AccountSerializer(read_only=True)
    post_reaction=serializers.SerializerMethodField(read_only=True)
    post_comment=serializers.SerializerMethodField(read_only=True)
    # post_comment_reply=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Post
        fields='__all__'
        
    def get_post_reaction(self, obj):
        items = obj.post_reaction.all()
        serializer = PostReactionSerializer(items, many=True)
        return serializer.data
    
    def get_post_comment(self, obj):
        items = obj.post_comment.all()
        serializer = PostCommentSerializer(items, many=True)
        return serializer.data
    
    # def get_post_comment_reply(self, obj):
    #     items = obj.post_comment_reply.all()
    #     serializer = PostComment_Reply_Serializer(items, many=True)
    #     return serializer.data

    
class ProfileSerializerWithToken(ProfileSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Account
        fields="__all__"
        
    def get_token(self,obj):
        token=RefreshToken.for_user(obj)
        return str(token.access_token)

class ProfileVerificationSerializer(serializers.ModelSerializer):
    user=ProfileSerializer(read_only=True)
    class Meta:
        model=ProfileVerification
        fields='__all__'
        

    
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

class NewClient_RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client_Requests
        fields='__all__'
        

class Client_RequestSerializer(serializers.ModelSerializer):
    request_from=AccountSerializer(read_only=True)
    class Meta:
        model = Client_Requests
        fields = "__all__"
        
        
class Proposals_AdminSerializer(serializers.ModelSerializer):
    proposal_from=AccountSerializer(read_only=True)
    proposal=Client_RequestSerializer(read_only=True)
    eligible=AccountSerializer(read_only=True)
    class Meta:
        model = Proposals_Admin
        fields = "__all__"
        
        
class Aec_Proposals_UserSerializer(serializers.ModelSerializer):
    admin_proposal=Proposals_AdminSerializer(read_only=True)
    class Meta:
        model=Aec_Proposals_User
        fields='__all__'