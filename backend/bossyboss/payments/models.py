from django.db import models
from orders.models import Order

# Create your models here.
# Handles payment processing and records
# Payment model
class Payment(models.Model):
    INITIATED = 'INITIATED'
    SUCCESS = 'SUCCESS'
    FAILED = 'FAILED'

    STATUS_CHOICES = [
        (INITIATED, 'Initiated'),
        (SUCCESS, 'Success'),
        (FAILED, 'Failed'),
    ]

    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    mpesa_receipt = models.CharField(max_length=50, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)