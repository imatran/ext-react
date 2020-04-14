import React from 'react';
import { Clock } from './clock';
import { Hello } from './hello';
import { Personnel } from './personnel';
import { Files } from './files';
import { MultiTabs } from './multitabs';
import '../css/DemoView.css';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export class DemoView extends React.Component {

    constructor(props) {
        super(props);

        this.ownerView = props.ownerView;
        this.state = this.getState();
    }

    render() {

        return (
            <div className={'demo-view'}>

                <div className='container'>

                    <div className={'left'}>

                        <div className={'border-panel'}>
                            <Personnel height={this.state.gridHeight}/>
                        </div>

                        <div className='spacer-m'/>

                        <div className={'border-panel'}>
                            <MultiTabs height={this.state.tabHeight}/>
                        </div>

                    </div>

                    <div className={'right'}>

                        <div className={'border-panel'}>
                            <Files height={this.state.treeHeight}/>
                        </div>

                        <div className='spacer-m'/>

                        <div className={'border-panel'}>
                            <Hello/>
                        </div>

                        <Clock/>

                    </div>

                </div>

                <NotificationContainer/>
            </div>
        );

    }

    componentDidMount() {
        this.ownerView.on({
            afterlayout: () => {
                this.setState(this.getState());
            }
        });
    }

    getState() {
        return {
            gridHeight: this.ownerView.getHeight() / 3,
            treeHeight: this.ownerView.getHeight() / 3,
            tabHeight: this.ownerView.getHeight() / 3 + 40
        };
    }

}
