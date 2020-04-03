import React from 'react';
import { TabPanel, Container } from 'lib/modules';
import { Personnel } from '../personnel';
import { Personnel as PersonnelRedux } from '../personnel/redux';
import { Hello as Hello } from '../hello/fragments';
import { Hello as HelloRedux } from '../hello/redux';

export class MultiTabs extends React.Component {

    constructor(props) {
        super(props);

        this.tabBarHeight = 44;

        this.state = {
            tabContentHeight: this.props.height - this.tabBarHeight
        };
    }

    render() {
        return(
            <>
                <TabPanel
                    height={this.props.height}
                    onTabChange={() => { this.updateGridHeight(); }}
                >
                    <Container title='Personnels'>
                        <Personnel
                            height={this.state.tabContentHeight}
                        />
                    </Container>

                    <Container title='Personnels'>
                        <div>
                            <PersonnelRedux
                                ref={c => this.reduxGridRef = c}
                                height={this.state.tabContentHeight}
                            />
                        </div>
                    </Container>

                    <Container title='Hello World!' layout={{type: 'hbox', align: 'stretch'}}>
                        <Container flex={1} scrollable={true}>
                            <Hello/>
                        </Container>

                        <div style={{fontSize: '9px', margin: '8px 5px 0 5px'}}>Rendered by React</div>
                    </Container>

                    <Container title='Hello World!' layout={{type: 'hbox', align: 'stretch'}}>
                        <Container flex={1} scrollable={true}>
                            <HelloRedux/>
                        </Container>

                        <div style={{fontSize: '9px', margin: '8px 5px 0 5px'}}>Rendered by React/Redux</div>
                    </Container>
                </TabPanel>
            </>
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