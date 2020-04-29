import React from 'react';
import { TabPanel, Container } from 'lib/modules';
import { Line } from './line/Line';
import { Pie } from './pie/Pie';
import { Bar } from './bar/Bar';
import { Column } from './column/Column';

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
            <TabPanel height={this.props.height}>
                <Container title='Line'>
                    <Line height={this.state.tabContentHeight} />
                </Container>

                <Container title='Pie'>
                    <Pie height={this.state.tabContentHeight} />
                </Container>

                <Container title='Bar'>
                    <Bar height={this.state.tabContentHeight} />
                </Container>

                <Container title='Column'>
                    <Column height={this.state.tabContentHeight} />
                </Container>
            </TabPanel>
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
