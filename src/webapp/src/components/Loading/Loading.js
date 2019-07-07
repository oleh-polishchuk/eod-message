import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ isLoading, children }) => (
    <Fragment>
        <section className="loading">
            {isLoading && (
                <div className="loading__label">
                    Loading... <img src="/images/indicator.png" alt="Indicator" className="loading__indicator" />
                </div>
            )}
            <div className={`loading__content ${isLoading ? "loading__content--active" : ""}`}>
                {children}
            </div>
        </section>
    </Fragment>
);

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default Loading;
