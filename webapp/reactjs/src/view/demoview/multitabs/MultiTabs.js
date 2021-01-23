import React from 'react';
import { ExtContainer, ExtTabPanel } from 'lib/ext-components';
import { Personnel } from '../personnel';
import { Personnel as PersonnelRedux } from '../personnel/redux';
import { Hello as Hello } from '../hello/fragments';
import { Hello as HelloRedux } from '../hello/redux';

export class MultiTabs extends React.Component {

    constructor(props) {
        super(props);

        this.tabBarHeight = 40;

        this.state = {
            tabContentHeight: this.props.height - this.tabBarHeight
        };
    }

    render() {
        return(
            <ExtTabPanel
                height={this.props.height}
                onTabChange={() => { this.updateGridHeight(); }}
            >
                <ExtContainer title='Personnels'>
                    <Personnel
                        height={this.state.tabContentHeight}
                    />
                </ExtContainer>

                <ExtContainer title='Personnels'>
                    <PersonnelRedux
                        ref={c => this.reduxGridRef = c}
                        height={this.state.tabContentHeight}
                    />
                </ExtContainer>

                <ExtContainer title='Hello World!' layout={{type: 'hbox', align: 'stretch'}}>
                    <ExtContainer flex={1} scrollable={true}>
                        <Hello/>
                    </ExtContainer>

                    <div style={{fontSize: '9px', margin: '8px 5px 0 5px'}}>Rendered by React</div>
                </ExtContainer>

                <ExtContainer title='Hello World!' layout={{type: 'hbox', align: 'stretch'}}>
                    <ExtContainer flex={1} scrollable={true}>
                        <HelloRedux/>
                    </ExtContainer>

                    <div style={{fontSize: '9px', margin: '8px 5px 0 5px'}}>Rendered by React/Redux</div>
                </ExtContainer>
            </ExtTabPanel>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.height !== this.props.height) {
            this.setState({
                tabContentHeight: this.props.height - this.tabBarHeight
            });

            this.updateGridHeight();
        }
    }

    updateGridHeight() {
        const height = this.props.height - this.tabBarHeight;
        this.reduxGridRef && this.reduxGridRef.updateHeight(height);
    }

}
