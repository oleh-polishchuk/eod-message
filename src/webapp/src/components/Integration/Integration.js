import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Integration.css';

const Integration = ({ integration }) => (
    <a
        className="integration"
        href={integration.url}
    >
        <div className="integration__icons">
            {integration.icons.map((icon, index) => (
                <div key={index} className="integration__icon-group">
                    <img
                        className="integration__icon"
                        src={icon}
                        alt="icon"
                    />
                    <img
                        className="integration__plus"
                        src="/images/plus-icon.jpg"
                        alt="icon"
                    />
                </div>
            ))}
        </div>
        <div className="integration__title">{integration.title}</div>
        <div className="integration__description">{integration.description}</div>
    </a>
);

Integration.propTypes = {
    integration: PropTypes.shape({
        title: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.node.isRequired,
        ]).isRequired,
        description: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.node.isRequired,
        ]).isRequired,
        icons: PropTypes.arrayOf(
            PropTypes.string
        ).isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
};

export default Integration;
