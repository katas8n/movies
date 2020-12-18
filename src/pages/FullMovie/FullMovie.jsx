import React, { Component } from 'react';
import Button from '../../shared/components/Button/Button';
import SimilarMovies from './SimilarMovies/SimilarMovies';

import { shape } from 'prop-types';
import PT from 'prop-types';
import Axios from 'axios';

import './FullMovie.scss';

const axios = Axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = 'c7f6d879d30beedca16958aaeab0fceb';

//https://api.themoviedb.org/3/movie/24428/similar?api_key=c7f6d879d30beedca16958aaeab0fceb&language=en-US&page=1
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=c7f6d879d30beedca16958aaeab0fceb&language=en-US

//CLASS_COMPOM
class FullMovie extends Component {
    state = {
        similarMovies: [],
        fullMovie: null
    };
    componentDidMount() {
        const { match, movies } = this.props;
        const { slug } = match.params;

        const fullMovie = movies.find(({ id }) => id === +slug);

        if (fullMovie) {
            return this.setState({ fullMovie });
        }
        axios
            .get(`/movie/${slug}?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                const fullMovie = response.data;

                if (!fullMovie) {
                    return this.fetchSimularMovie(slug)
                        .then(response => {
                            const { data } = response;

                            if (!data) return this.setState({ fullMovie });

                            const similarMovies = data.results.slice(0, 5);
                            this.setState({
                                fullMovie,
                                similarMovies
                            });
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }

                this.fetchSimularMovie(slug)
                    .then(response => {
                        const { data } = response;

                        if (!data) return this.setState({ fullMovie });

                        const similarMovies = data.results.slice(0, 5);
                        this.setState({
                            fullMovie,
                            similarMovies
                        });
                    })
                    .catch(e => {
                        console.error(e);
                    });

                this.setState({
                    fullMovie: fullMovie
                });
            })
            .catch(e => {
                console.log('error', e);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const { slug } = this.props.match.params;
        const { slug: prevSlug } = prevProps.match.params;

        if (slug == prevSlug) return;

        axios
            .get(`/movie/${slug}?api_key=${API_KEY}&language=en-US`)
            .then(response => {
                const fullMovie = response.data;

                if (!fullMovie) {
                    return this.fetchSimularMovie(slug)
                        .then(response => {
                            const { data } = response;

                            if (!data) return this.setState({ fullMovie });

                            const similarMovies = data.results.slice(0, 5);
                            this.setState({
                                fullMovie,
                                similarMovies
                            });
                        })
                        .catch(e => {
                            console.error(e);
                        });
                }

                this.fetchSimularMovie(slug)
                    .then(response => {
                        const { data } = response;

                        if (!data) return this.setState({ fullMovie });

                        const similarMovies = data.results.slice(0, 5);
                        this.setState({
                            fullMovie,
                            similarMovies
                        });
                    })
                    .catch(e => {
                        console.error(e);
                    });

                this.setState({
                    fullMovie: fullMovie
                });
            });
    }

    fetchSimularMovie(slug) {
        return axios.get(
            `/movie/${slug}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
    }
    render() {
        const { fullMovie, similarMovies } = this.state;

        if (!fullMovie) return null;

        const {
            id,
            poster_path,
            original_title,
            release_date,
            overview,
            backdrop_path
        } = fullMovie;

        const imgUrl = 'https://image.tmdb.org/t/p/w500';

        return (
            <div className="full-movie">
                <div
                    key={id}
                    className="full-movie__content"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`
                    }}
                >
                    <div className="full-movie__body">
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
                    <SimilarMovies movies={similarMovies} />
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
            poster__path: PT.string,
            id: PT.number.isRequired,
            backdrop_path: PT.string,
            original_title: PT.string.isRequired,
            overview: PT.string.isRequired,
            release_date: PT.string.isRequired
        })
    ).isRequired
};
export default FullMovie;
