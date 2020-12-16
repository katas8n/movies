import React, { PureComponent } from 'react';
import Axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/components/Home';
import Layout from './shared/components/Layout/Layout.jsx';
import ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';
import FullMovie from './pages/FullMovie/FullMovie';

const API_KEY = 'c7f6d879d30beedca16958aaeab0fceb';

const axios = Axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movies: [],
            isFetching: false
        };
    }
    PageNotFound = () => {
        return <p>Page Not Found</p>;
    };

    componentDidMount() {
        this.fetchMovies('avengers');
    }

    static getDerivedStateFromError(error) {
        console.log('[error]', error);
        return error;
    }

    fetchMovies = query => {
        this.setState({ isFetching: true });

        axios
            .get(
                `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`
            )
            .then(response => {
                if (!response.data) return;

                const movies = response.data.results;

                setTimeout(() => {
                    this.setState({ movies });
                }, 1000);
            })
            .catch(error => {
                console.log('[error]', error);
            })
            .finally(() => {
                setTimeout(() => {
                    this.setState({ isFetching: false });
                }, 1000);
            });
    };

    searchMovies = () => {
        const { search } = this.state;

        if (!search) return;

        this.fetchMovies(search);
    };
    onChangeInputHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        const { search, movies, isFetching } = this.state;

        return (
            <ErrorBoundary>
                <Layout
                    search={search}
                    isFetching={isFetching}
                    chanegeInputValue={this.onChangeInputHandler}
                    searchMovies={this.searchMovies}
                >
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return <Home movies={movies} />;
                            }}
                        />
                        <Route
                            path="/movies/:slug"
                            render={props => {
                                return <FullMovie {...props} movies={movies} />;
                            }}
                        />

                        <Route
                            path="/favorite-movies"
                            render={() => {
                                return <p>favorite-movies</p>;
                            }}
                        />

                        <Route
                            path="/profiles"
                            render={() => {
                                return <p>profiles</p>;
                            }}
                        />

                        <Route
                            path="/logout"
                            render={() => {
                                return <p>Log Out</p>;
                            }}
                        />

                        <Route path="/404" component={this.PageNotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </Layout>
            </ErrorBoundary>
        );
    }
}
export default App;
