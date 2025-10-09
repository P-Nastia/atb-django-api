from rest_framework import serializers
from .models import CustomUser
from .utils import compress_image
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
    
User = get_user_model()

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Користувача з таким email не існує")
        return value

    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

        send_mail(
            subject="Відновлення паролю",
            message=f"",
            fail_silently=False,
            # message=f"Перейдіть за посиланням для скидання паролю: {reset_link}",
            html_message=f"""
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #635985;">Відновлення паролю</h2>
                        <p>Щоб змінити пароль, перейдіть за посиланням:</p>
                        <p><a href="{reset_link}" style="background-color:#443C68; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px;">Змінити пароль</a></p>
                        <p>Якщо ви не запитували відновлення, просто ігноруйте цей лист.</p>
                    </div>
                </body>
                </html>
            """,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

class SetNewPasswordSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)

    def validate(self, attrs):
        try:
            uid = urlsafe_base64_decode(attrs['uid']).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Невірний uid")

        if not default_token_generator.check_token(user, attrs['token']):
            raise serializers.ValidationError("Невірний або прострочений токен")

        attrs['user'] = user
        return attrs

    def save(self):
        user = self.validated_data['user']
        user.set_password(self.validated_data['new_password'])
        user.save()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['id'] = user.id
        token['username'] = user.username
        token['email'] = user.email
        #token['phone'] = user.phone if user.phone else None
        token['image'] = user.image_small.url if user.image_small else None
        token['date_joined'] = user.date_joined.strftime('%Y-%m-%d %H:%M:%S')

        return token