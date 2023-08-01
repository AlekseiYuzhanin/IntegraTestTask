from django.db import models
from django.contrib.auth.models import User

class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=100)
    rating = models.FloatField()
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.title

