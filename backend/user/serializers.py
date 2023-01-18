from rest_framework import serializers
from .models import Profile
from products.models import Product
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from dj_rest_auth.serializers import TokenSerializer
from products.serializers import ProductSerializer


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    email = serializers.EmailField(required=True, validators=[UniqueValidator])
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, data):
       if data["password"] != data["password2"]:
           raise serializers.ValidationError(
               {"password2": "Passwords must match."}
           ) 
       return data

    # def create(self, validated_data):
    #     validated_data.pop("password2")
    #     return super().create(validated_data)

    def create(self, validated_data):
        password = validated_data.get("password")
        validated_data.pop("password2")
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class CustomTokenSerializer(TokenSerializer):
    user = UserTokenSerializer(read_only=True)

    class Meta(TokenSerializer.Meta):
        fields=('user', 'key')

        
class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    user_id = serializers.IntegerField(required=False)
    favorites = ProductSerializer(many = True, read_only = True)
    cards = ProductSerializer(many = True, read_only = True)
    # sell_products = ProductSerializer(many = True, read_only = True)
    sell_products = serializers.SerializerMethodField()
    # products_count = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ("id", "user", "user_id", "bio", "avatar", "favorites", "cards", "sell_products")

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.user_id = self.context['request'].user.id
        instance.save()
        return instance

    def get_sell_products(self, instance):
        products = Product.objects.all()
        # product = Product.objects.get(seller_id=instance.id)
        product = products.filter(seller_id=instance.user_id)
        return ProductSerializer(product, many=True).data

    # def get_products_count(self, obj):
    #     return obj.products.count()


# class MyUserSerializer(serializers.ModelSerializer):
#     seller_product_count = serializers.SerializerMethodField()
#     class Meta: 
#         model = MyUser
#         fields = ['username', 'email', 'first_name', 'last_name', 'role', 'favorites', 'card', 'seller_products']

#     def get_seller_product_count(self, obj):
#         return obj.products.count()
