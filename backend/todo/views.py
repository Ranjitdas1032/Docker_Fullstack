from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import Taskserializers
from django.core.cache import cache
from rest_framework.response import Response


# Create your views here.
class Taskviewset(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = Taskserializers

    CACHE_KEY = 'tasks:all'
    CACHE_TIMEOUT = 60

    def list(self, request, *args, **kwargs):

        cached_data = cache.get(self.CACHE_KEY)

        if cached_data is not None:
            print("Data is printed from redis ...")
            return Response(cached_data)
        
        print("Data is printed from database")
        
        query = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(query,many=True)

        cache.set(self.CACHE_KEY,serializer.data,timeout=self.CACHE_TIMEOUT)
        print(f"Cached data of len = {len(serializer.data)} task for {self.CACHE_TIMEOUT}")
        return Response(serializer.data)
    
    def perform_create(self,serializer):
        serializer.save()
        cache.delete(self.CACHE_KEY)
        print("Deleting the old creating data from redis")
    
    def perform_update(self,serializer):
        serializer.save()
        cache.delete(self.CACHE_KEY)
        print("Deleting the old updating data from redis")
    
    def perform_destroy(self,instance):
        instance.delete()
        cache.delete(self.CACHE_KEY)
        print("Deleting the old deleting data from redis")