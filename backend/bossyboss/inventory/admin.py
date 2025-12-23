from django.contrib import admin
from .models import Inventory, StockTransaction

# Register your models here.

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity_in_stock', 'reorder_level')


@admin.register(StockTransaction)
class StockTransactionAdmin(admin.ModelAdmin):
    list_display = ('product', 'quantity', 'transaction_type', 'created_at')