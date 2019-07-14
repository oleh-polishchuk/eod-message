import './style.css';
import axios from 'axios'
import React, { Fragment, Component } from 'react';

const Timer = () => (
    <div className="eod__timer">
        <section className="timer">
            <div className="timer__title">Time to Send</div>
            <div className="timer__time" id="timerTime">00:00:00</div>
            <div className="timer__schedule-time">Daily at 18:00</div>
        </section>
    </div>
);

const team = [
    {
        name: 'Oleh Polishchuk',
        position: 'Front-End Engineer: Nectar',
        logo: '/images/oleh.jpg',
    },
    {
        name: 'Faisal Mughal',
        position: 'Front-End Engineer: Nectar',
        logo: '/images/faisal.png',
    },
    {
        name: 'Avi Zuber',
        position: 'Front-End Engineer: DreamCloud',
        logo: '/images/avi.png',
    },
];

class StatusUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: null,
            error: null,
        }
    }

    componentDidMount() {
        this.getEODMessage()
    }

    getEODMessage = () => {
        axios.get(`/api/message${window.location.search}`).then(res => {
            this.setState({ message: res.data })
        }).catch(error => {
            this.setState({ error })
        })
    };

    timer = () => {
        const formatTime = (time) => {
            if (time < 10) {
                time = `0${time}`;
            }
            return time;
        };

        const countDownDate = new Date();
        countDownDate.setHours(20, 0, 0);

        const interval = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timerTime").innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

            if (distance < 0) {
                clearInterval(interval);
                document.getElementById("timerTime").innerHTML = "SENT";
            }
        }, 1000);
    }

    render() {
        const { message } = this.state;

        return (
            <Fragment>
                {team.map(user => (
                    <section className="eod">
                        <div className="eod__container">
                            <div className="eod__post">
                                <section className="post">
                                    <div className="post__author">
                                        <section className="author">
                                            <img className="author__icon"
                                                 src={user.logo}
                                                 alt="Author" />
                                            <div className="author__caption">
                                                <div className="author__name">{user.name}</div>
                                                <div className="author__position">{user.position}</div>
                                            </div>
                                        </section>
                                    </div>
                                    <pre className="post__message">
                                {message || "Loading..."}
                            </pre>
                                </section>
                            </div>
                        </div>
                    </section>
                ))}
            </Fragment>
        );
    }
}

StatusUpdate.propTypes = {};

export default StatusUpdate;
