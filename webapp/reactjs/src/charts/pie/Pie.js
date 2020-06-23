import React from 'react';
import { Container, PolarChart } from 'lib/modules';
import data from './data';

Ext.require([
    'Ext.chart.series.Pie',
    'Ext.chart.interactions.Rotate'
]);

export class Pie extends React.Component {
    constructor(props) {
        super(props);

        this.store = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1' ],
            data: data
        });
    }

    render() {
        return(
            <Container layout='fit'>
                <PolarChart
                    store={this.store}
                    height={this.props.height}
                    innerPadding={10}
                    insetPadding='60 0 00 0'
                    interactions={['rotate']}

                    series={[{
                        type: 'pie',
                        angleField: 'data1',
                        highlight: true,
                        label: {
                            font: '10px',
                            color: '#666',
                            field: 'os',
                            calloutLine: {
                                length: 40,
                                width: 2
                            }
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onSeriesTooltipRender
                        }
                    }]}
                />
            </Container>
        );
    }

    onSeriesTooltipRender(tooltip, record) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    }
}