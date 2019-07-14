import './style.css';
import React, { Fragment } from 'react';
import Integration from "../../components/Integration/Integration";

const integrations = [
    {
        id: '0',
        title: 'Status update',
        description: <span>Integration pull your daily activity from Harvest and send it into Slack <b>#fed-eod</b> channel</span>,
        icons: [
            '/images/harvest-icon.jpg',
            '/images/slack-icon.jpg',
        ],
        url: '/eod-message',
    }, {
        id: '1',
        title: 'Redmine reports',
        description: 'Integration pull your daily activity from Harvest, sync it with Asana, and send it into Redmine as a time entries',
        icons: [
            '/images/harvest-icon.jpg',
            '/images/asana-icon.jpg',
            '/images/redmine-icon.jpg',
        ],
        url: '/reports',
    },
];

const Home = () => (
    <Fragment>
        <div className="page__label">All integrations</div>
        <div className="page__integrations">
            {integrations.map(integration => (
                <Integration
                    key={integration.id}
                    integration={integration}
                />
            ))}
        </div>
    </Fragment>
);

Home.propTypes = {};

export default Home;
