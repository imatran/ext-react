import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { Consumer } from './components/Consumer';
import { Producer1 } from './components/Producer1';
import { Producer2 } from './components/Producer2';
import { store } from './store';
import '../Hello.css';

export class Hello extends React.Component {
    render() {
        // console.log('Hello');

        return(
            <Provider store={store}>
                <div className='main'>
                    <Consumer/>
                    <SnackbarProvider>
                        <Producer1/>
                        <Producer2/>
                    </SnackbarProvider>
                </div>
            </Provider>
        );
    }
}
