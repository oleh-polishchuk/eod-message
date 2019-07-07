import React, { Fragment, Component } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Integration from "./components/Integration/Integration";
import Loading from "./components/Loading/Loading";

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


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 500);
    }

    render() {
        const { isLoading } = this.state;

        return (
            <Fragment>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
                <div className="page">
                    <Header
                        title="Messenger"
                        logo="/images/nectar-logo.jpg"
                    />
                    <Loading isLoading={isLoading}>
                        <div className="page__container container">
                            <div className="page__label">All integrations</div>
                            <div className="page__integrations">
                                {integrations.map(integration => (
                                    <Integration
                                        key={integration.id}
                                        integration={integration}
                                    />
                                ))}
                            </div>
                        </div>
                    </Loading>
                </div>
            </Fragment>
        );
    }
}

export default App;
