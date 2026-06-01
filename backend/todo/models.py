from django.db import models

# Create your models here.
class Task(models.Model):
    choice = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    )
    title = models.CharField(max_length=200)
    description = models.CharField(blank=True)
    status = models.CharField(max_length=100,choices=choice,default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title