import React from 'react';
import { ExtLabel } from 'lib/ext-components';

export class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <ExtLabel
                text={`Time: ${this.state.date.toDateString()} ${this.state.date.toLocaleTimeString()}.`}
            />
        );
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

}
