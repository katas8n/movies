import React from 'react';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <strong className='footer__copyright'>All Rights Reserved , {new Date().getFullYear()} </strong>
            </div>
        </footer>
    );
};

export default Footer;
