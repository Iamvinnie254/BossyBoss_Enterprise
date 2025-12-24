from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


# Detailed serializer including stock information
class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    stock = serializers.IntegerField(source="inventory.quantity")

    class Meta:
        model = Product
        fields = "__all__"
