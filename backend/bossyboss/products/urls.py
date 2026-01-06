from django.urls import path
from .views import ProductListView, ProductDetailView, CategoryListView, CategoryDetailView

urlpatterns = [
    path("", ProductListView.as_view(), name="product-list"),

    path("categories/", CategoryListView.as_view(), name="category-list"),
    path("<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
    path("categories/<slug:slug>/", CategoryDetailView.as_view(), name="category-detail"),
]
