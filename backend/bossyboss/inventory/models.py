from django.db import models
from products.models import Product

# Create your models here.
# Handles inventory management

# Inventory model
class Inventory(models.Model):
    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name='inventory'
    )
    quantity_in_stock = models.PositiveIntegerField()
    reorder_level = models.PositiveIntegerField()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity_in_stock}"


# Stock Transaction model
class StockTransaction(models.Model):
    IN = 'IN'
    OUT = 'OUT'

    TRANSACTION_TYPES = [
        (IN, 'Stock In'),
        (OUT, 'Stock Out')
    ]

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    reference = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
