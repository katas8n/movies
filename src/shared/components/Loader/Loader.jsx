import React from 'react';
import PT from 'prop-types'
import { createPortal } from 'react-dom';

import './Loader.scss';

const Loader = ({type,toPortal = true}) => {
    const loaderClasses = [
    'fas' ,
    'fa-spinner',
    'loader',
    `loader--${type}` ];

    return createPortal(
        <i className={loaderClasses.join(' ')}/>,
        document.getElementById('modal-root')
    );
};

Loader.PT = {
    type:PT.string.isRequired,
    toPortal:PT.bool
}
export default Loader;
