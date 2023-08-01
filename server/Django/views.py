from rest_framework import viewsets
from rest_framework.response import Response
from .models import Genre, Movie
from .serializers import GenreSerializer, MovieSerializer
from random import choice

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    
class RandomMovieViewSet(viewsets.ViewSet):
    def random_movie(self, request):
        movies = Movie.objects.all()
        random_movie = choice(movies)
        serializer = MovieSerializer(random_movie)
        return Response(serializer.data)