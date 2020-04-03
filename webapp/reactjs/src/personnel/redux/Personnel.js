import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersonnelGrid } from './components/PersonnelGrid'

export class Personnel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.height
        };
    }

    render() {
        return(
            <Provider store={store}>
                <PersonnelGrid height={this.state.height}/>
            </Provider>
        );
    }

    updateHeight(height) {
        this.setState({
            height: height
        });
    }
}