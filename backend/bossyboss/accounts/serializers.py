from rest_framework import serializers
from .models import User, Profile

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("email", "phone", "full_name", "password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    full_name = serializers.CharField(source="user.full_name")
    phone = serializers.CharField(source="user.phone")

    class Meta:
        model = Profile
        fields = (
            "email",
            "full_name",
            "phone",
            "address",
            "city",
            "country",
        )
