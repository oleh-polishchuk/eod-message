import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import StatusUpdate from "./pages/StatusUpdate";

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
                            <Router>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/reports" component={Reports} />
                                <Route exact path="/eod-message" component={StatusUpdate} />
                            </Router>
                        </div>
                    </Loading>
                </div>
            </Fragment>
        );
    }
}

export default App;
