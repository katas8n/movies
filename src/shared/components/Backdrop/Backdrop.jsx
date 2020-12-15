import React from 'react';
import { createPortal } from 'react-dom';

import './Backdrop.scss';

const Backdrop = () => {
    return createPortal(
    <div className="backdrop"/>,
    document.getElementById('modal-root'))
};

export default Backdrop;
