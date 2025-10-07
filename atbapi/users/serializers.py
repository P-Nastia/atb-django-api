from rest_framework import serializers
from .models import CustomUser
from .utils import compress_image
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'image_small', 'image_medium', 'image_large']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password_confirm', 'image')

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        image = validated_data.pop('image', None)
        password = validated_data.pop('password')
        validated_data.pop('password_confirm')

        user = CustomUser(**validated_data)
        user.set_password(password)

        if image:
            small, name = compress_image(image, (300, 300))
            user.image_small.save(name, small, save=False)

            medium, name = compress_image(image, (800, 800))
            user.image_medium.save(name, medium, save=False)

            large, name = compress_image(image, (1200, 1200))
            user.image_large.save(name, large, save=False)

        user.save()
        return user