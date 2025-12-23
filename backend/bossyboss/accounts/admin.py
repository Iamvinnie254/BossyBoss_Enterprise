from django.contrib import admin
from .models import User, CustomerProfile

# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'full_name', 'is_staff', 'is_active')
    search_fields = ('email', 'phone')
    list_filter = ('is_staff', 'is_active')


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'town', 'county')