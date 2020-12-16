import React, { Component } from 'react';
import Button from '../../shared/components/Button/Button';

import { shape } from 'prop-types';
import PT from 'prop-types';
import Axios from 'axios';

import './FullMovie.scss';

const axios = Axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = 'c7f6d879d30beedca16958aaeab0fceb';

//https://api.themoviedb.org/3/movie/24428/similar?api_key=c7f6d879d30beedca16958aaeab0fceb&language=en-US&page=1

//CLASS_COMPOM
class FullMovie extends Component {
    state = {
        similarMovies: []
    };
    componentDidMount() {
        const { slug } = this.props.match.params;

        console.log('[slug]', slug);
        axios
            .get(
                `/movie/${slug}/similar?api_key=;${API_KEY}&language=en-US&page=1`
            )
            .then(response => {})
            .catch(e => {});
    }
    componentWillUnmount() {}

    render() {
        const { match, movies } = this.props;
        const { slug } = match.params;

        const fullmovie = movies.find(({ id }) => id === +slug);

        if (!fullmovie) return null;

        const {
            id,
            poster_path,
            original_title,
            release_date,
            overview,
            backdrop_path
        } = fullmovie;

        const imgUrl = 'https://image.tmdb.org/t/p/w500';

        return (
            <div className="full-movie">
                <div key={id} className="full-movie__content">
                    <div
                        className="full-movie__body"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`
                        }}
                    >
                        <div className="full-movie__img-wrapper">
                            <img
                                src={imgUrl + poster_path}
                                alt={original_title}
                                className="full-movie__img"
                            />
                        </div>
                        <div className="full-movie__info-wrapper">
                            <div className="full-movie__info">
                                <h2 className="full-movie__title">
                                    {original_title}
                                </h2>
                                <strong className="full-movie__date">
                                    {release_date}
                                </strong>
                                <p className="full-movie__text">{overview}</p>
                            </div>
                            <Button className="button--blue full-movie__btn">
                                Add to favorite
                            </Button>
                        </div>
                    </div>
                    <div className="full-movie__recommended">
                        Recommended Movies
                    </div>
                </div>
            </div>
        );
    }
}
FullMovie.PT = {
    match: shape({
        params: PT.object.isRequired
    }).isRequired,
    movies: PT.arrayOf(
        PT.shape({
            poster_path: PT.string,
            id: PT.number.isRequired,
            backdrop_path: PT.string,
            original_title: PT.string.isRequired,
            overview: PT.string.isRequired,
            release_date: PT.string.isRequired
        })
    ).isRequired
};
export default FullMovie;
