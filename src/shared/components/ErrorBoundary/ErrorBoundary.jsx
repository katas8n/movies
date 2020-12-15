import React, { Component } from 'react';
import PT from 'prop-types'

import Footer from '../Footer/Footer';

import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
    state = {
        error: null
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if(!error) return children;

        const {name , message} = error;
        
        return (
            <div className="error-boundary">
                <div className="error-boundary__content">
                    <div className="error-boundary__body">
                        <h1 className='error-boundary__heading'>
                            {name}
                        </h1>
                        <p className="error-boundary__text">
                            {message}
                        </p>
                        <a href="/" className="error-boundary__link">Return fot prev page</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

ErrorBoundary.PT = {
    children : PT.oneOfType([
        PT.object,
        PT.bool,
        PT.arrayOf(PT.object)
    ]).isRequired
}

export default ErrorBoundary;
