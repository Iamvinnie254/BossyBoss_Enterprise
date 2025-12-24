# Serializer is the bridge between complex data types such as querysets and Python data types that can be easily rendered into JSON, XML, or other content types.
#Serializers are the bridge between models and JSON.
# They define how model instances are converted to JSON and vice versa.

from rest_framework import serializers
from .models import User, CustomerProfile, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'phone', 'full_name')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'phone', 'full_name', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = '__all__'

# Serializer for the extended Profile model
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "phone_number",
            "address",
            "city",
            "country",
        )