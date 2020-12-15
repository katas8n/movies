import { exact } from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const links = [
    {
        id: 1,
        url: '/',
        title: 'Home',
        exact: true
    },
    {
        id: 2,
        url: '/favorite-movies',
        title: 'Favorite-movies'
    },
    {
        id: 3,
        url: '/profiles',
        title: 'Profiles'
    },
    {
        id: 4,
        url: '/logout',
        title: 'Logout'
    }
];

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                {links.map(({ id, url, title }) => {
                    return (
                        <li key={id} className="navbar__list-item">
                            <NavLink
                                className="navbar__link"
                                to={url}
                                exact={exact}
                                activeClassName="navbar__link--active"
                            >
                                {title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
