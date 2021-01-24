import React from 'react';
import { ExtContainer, ExtTabPanel } from 'lib/ext-components';
import { Line, Pie, Bar, Column } from '.';
import { DragDrop } from '../dragdrop';

export class ChartTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabContentWidth: this.props.width - 25,
            tabContentHeight: this.props.height - 40
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

                <ExtContainer title='D&D'>
                    <DragDrop width={this.state.tabContentWidth} height={this.state.tabContentHeight} />
                </ExtContainer>
            </ExtTabPanel>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
            this.setState({
                tabContentWidth: this.props.width - 26,
                tabContentHeight: this.props.height - 40
            });
        }
    }

}
