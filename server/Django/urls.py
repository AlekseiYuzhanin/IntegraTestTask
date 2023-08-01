from django.urls import path
from .views import GenreViewSet, MovieViewSet, RandomMovieViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'genres', GenreViewSet, basename='genres')
router.register(r'movies', MovieViewSet, basename='movies')

urlpatterns = [
    path('movies/random/', RandomMovieViewSet.as_view({'get': 'random_movie'}), name='random_movie'),
]

urlpatterns += router.urls