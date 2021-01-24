import React from 'react';
import ReactDOM from 'react-dom';
import { Clock } from './clock';
import { Hello } from './hello';
import { Personnel } from './personnel';
import { Files } from './files';
import { MultiTabs } from './multitabs';
import { ChartTabs } from './charts';
import './DemoView.css';

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
            <div className='demo-view'>

                <div className='container'>

                    <div className='left' ref={c => this.leftPanelRef = c}>

                        <div className='border-panel'>
                            <Personnel height={this.state.gridHeight}/>
                        </div>

                        <div className='spacer-m'/>

                        <div className='border-panel'>
                            <MultiTabs height={this.state.tabHeight}/>
                        </div>

                        <div className='spacer-m'/>

                        <div className='border-panel'>
                            <ChartTabs width={this.state.tabWidth} height={this.state.chartHeight}/>
                        </div>

                    </div>

                    <div className='right'>

                        <div className='border-panel'>
                            <Files height={this.state.treeHeight}/>
                        </div>

                        <div className='spacer-m'/>

                        <div className='border-panel'>
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
        this.setState(this.getState());

        this.ownerView.on({
            //resize components
            afterlayout: () => {
                this.setState(this.getState());
            },

            //unmount component when owner view is destroyed
            destroy: (view) => {
                ReactDOM.unmountComponentAtNode(view.getEl().dom);
            }
        });
    }

    getState() {
        const width = this.leftPanelRef ? this.leftPanelRef.clientWidth : 0,
              height = this.ownerView.getHeight() / 3 - 50;

        return {
            gridHeight: height,
            treeHeight: height,
            tabWidth: width,
            tabHeight: height + 40,
            chartHeight: height + 40,
        };
    }

}
