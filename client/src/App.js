import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [films, setFilms] = useState([]);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/movies/')
      .then(response => {
        setFilms(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const sortByGenre = () => {
    const sorted = [...films].sort((a, b) => {
      const genreA = a.genres[0].name.toUpperCase();
      const genreB = b.genres[0].name.toUpperCase();
      if (genreA < genreB) {
        return -1;
      }
      if (genreA > genreB) {
        return 1;
      }
      return 0;
    });
    setFilms(sorted);
    setSortType('genre');
  };

  const sortByRating = () => {
    const sorted = [...films].sort((a, b) => b.rating - a.rating);
    setFilms(sorted);
    setSortType('rating');
  };

  const sortByRatingDesc = () => {
    const sorted = [...films].sort((a, b) => a.rating - b.rating);
    setFilms(sorted);
    setSortType('rating');
  };


  useEffect(() => {
    if (sortType === 'genre') {
      sortByGenre();
    } else if (sortType === 'rating') {
      sortByRating();
    }
  }, [sortType]);

  return (
    <div className='App'>
      <div style={{display: 'flex', gap: '20px', paddingLeft: '10px'}}>
        <button className='btn' onClick={sortByGenre}>Сортировка по жанру</button>
        <button className='btn' onClick={sortByRating}>Сортировка по возрастанию рейтинга</button>
        <button className='btn' onClick={sortByRatingDesc}>Сортировка по убыванию рейтинга</button>
      </div>
      <div className='map_elements'>
      {films.map(film => (
        <div style={{border: '1px solid teal'}} key={film.id}>
          <h2>{film.title}</h2>
          <p>Рейтинг: {film.rating}</p>
          <p>Жанры: {film.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;