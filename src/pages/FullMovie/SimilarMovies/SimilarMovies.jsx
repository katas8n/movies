import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import './SimilarMovies.scss';

const SimilarMovies = ({ movies }) => (
    <div className="similar-movies">
        <ul className="similar-movies__list">
            {movies.map(({ id, poster_path, original__title }) => (
                <li key={id} className="similar-movies__list-item">
                    <Link to={`/movies/${id}`} className="similar-movies__link">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={original__title}
                            className="similar-movies__img"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

SimilarMovies.PT = {
    movies: PT.arrayOf(
        PT.shape({
            id: PT.number.isRequired,
            original__title: PT.string.isRequired,
            poster_path: PT.string
        }).isRequired
    )
};

export default SimilarMovies;
