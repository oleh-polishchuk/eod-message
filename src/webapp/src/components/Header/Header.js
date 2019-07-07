import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ logo, title }) => (
    <header className="header">
        <div className="header__container container">
            <a href="/" className="header__home-link">
                <img
                    src={logo} alt="Logo"
                    className="header__logo"
                />
            </a>
            <div className="header__title">
                {title}
            </div>
        </div>
    </header>
);

Header.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Header;
