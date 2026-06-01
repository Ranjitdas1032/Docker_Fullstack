from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Taskviewset

router = DefaultRouter()
router.register(r'tasks',Taskviewset)

urlpatterns = [
    path('', include(router.urls)),
]