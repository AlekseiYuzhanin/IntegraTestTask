from rest_framework import serializers
from .models import Genre, Movie

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def create(self, validated_data):
        genres_data = validated_data.pop('genres')
        film = Movie.objects.create(**validated_data)
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(**genre_data)
            film.genres.add(genre)
        return film

