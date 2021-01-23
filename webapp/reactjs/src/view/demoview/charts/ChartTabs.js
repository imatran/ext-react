import React from 'react';
import { ExtContainer, ExtTabPanel } from 'lib/ext-components';
import { Line, Pie, Bar, Column } from '.';

export class ChartTabs extends React.Component {

    constructor(props) {
        super(props);

        this.tabBarHeight = 40;

        this.state = {
            tabContentHeight: this.props.height - this.tabBarHeight
        };
    }

    render() {
        return(
            <ExtTabPanel height={this.props.height}>
                <ExtContainer title='Line'>
                    <Line height={this.state.tabContentHeight} />
                </ExtContainer>

                <ExtContainer title='Pie'>
                    <Pie height={this.state.tabContentHeight} />
                </ExtContainer>

                <ExtContainer title='Bar'>
                    <Bar height={this.state.tabContentHeight} />
                </ExtContainer>

                <ExtContainer title='Column'>
                    <Column height={this.state.tabContentHeight} />
                </ExtContainer>
            </ExtTabPanel>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.height !== this.props.height) {
            this.setState({
                tabContentHeight: this.props.height - this.tabBarHeight
            });
        }
    }

}
