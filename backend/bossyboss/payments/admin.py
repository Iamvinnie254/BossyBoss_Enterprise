from django.contrib import admin
from .models import Payment

# Register your models here.

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'status', 'phone_number', 'created_at')