import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import './MovieApp.css';
import axios from 'axios';
import { useState } from "react";
export default function MovieApp() {

const [movie, setMovie] = useState([]);
const [sortBy, setSortBy] = useState('popularity.desc');
const [searchQuery, setSearchQuery] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');
const [genres, setGenres] = useState([]);
const [expanded, setExpanded] = useState(null);

useEffect(() => {
    const fetchGenres = async () => {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: 'b75cdad5d9d38d43d3d28f38577702d3',
            },
        });
        setGenres(response.data.genres);
        console.log(response.data.genres);
    };
    fetchGenres();
},[]);

useEffect(() => {
    const fetchMovies = async () => {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: 'b75cdad5d9d38d43d3d28f38577702d3',
                sort_by: sortBy,
                page: 1,
                with_genres: selectedGenre,
                query: searchQuery,
            },
        });
        setMovie(response.data.results);
    };
    fetchMovies();
}, [searchQuery, selectedGenre, sortBy]);

const handleSortChange = (event) => {
    setSortBy(event.target.value);
};

const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
};

const handleSearchSubmit = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
            api_key: 'b75cdad5d9d38d43d3d28f38577702d3',
            query: searchQuery,
        },
    });
    setMovie(response.data.results);
};

const toggleDescription = (movieId) => {
    setExpanded(expanded === movieId ? null : movieId);
}
return (
    <div className="container">
        <h1>MovieHouse</h1>
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearchSubmit} className="search-button">
                <AiOutlineSearch />
            </button>
        </div>
        <div className="filters">
            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by" value={sortBy} onChange={handleSortChange}>
                <option value="popularity.desc">Popularity Descending</option>
                <option value="popularity.asc">Popularity Ascending</option>
                <option value="vote_average.asc">Rating Ascending</option>
                <option value="vote_average.desc">Rating Descending</option>
                <option value="release_date.desc">Release Date Descending</option>
                <option value="release_date.asc">Release Date Ascending</option>
            </select>
            <label htmlFor="genre">Genre:</label>
            <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="movie-wrapper">
            {movie.map((movie) => (
                <div key={movie.id} className="movie">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p className="rating">Rating: {movie.vote_average}</p>
                    {expanded === movie.id ? (
                        <p>{movie.overview}</p>
                    ):(
                        <p>{movie.overview.substring(0, 150)}...</p>
                    )}
                    <button onClick={() => toggleDescription(movie.id)} className="read-more">
                        {expanded === movie.id ? 'Show Less' : 'Show More'}
                        </button>
                </div>
            ))}
        </div>
    </div>
);
}
