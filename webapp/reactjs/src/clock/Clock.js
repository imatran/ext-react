import React from 'react';

export class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {

        return (
            <div className='small-font'>
                Time: {this.state.date.toDateString()} {this.state.date.toLocaleTimeString()}.
            </div>
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