import React from 'react';
import { Container, CartesianChart } from 'lib/modules';
import data from './data';

Ext.require([
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.Bar'
]);

export class Column extends React.Component {
    constructor(props) {
        super(props);

        this.store = Ext.create('Ext.data.Store', {
            fields: ['month', 'high', 'low'],
            data: data
        });
    }

    render() {
        return(
            <Container layout='fit'>
                <CartesianChart
                    store={this.store}
                    height={this.props.height}
                    innerPadding='25 5 10 5'
                    insetPadding='10 0 0 0'

                    axes={[{
                        type: 'numeric',
                        position: 'left'
                    }, {
                        type: 'category',
                        position: 'bottom',
                        label: {
                            rotate: {
                                degrees: -45
                            }
                        }
                    }]}

                    series={[{
                        type: 'bar',
                        xField: 'month',
                        yField: ['high', 'low'],
                        stacked: false,
                        colors: ['#94ad24', '#fd8827'],

                        style: {
                            opacity: 0.80,
                            minGapWidth: 10
                        },

                        highlightCfg: {
                            strokeStyle: 'black',
                            radius: 10,
                            fillStyle: 'gold'
                        },

                        label: {
                            field: ['high', 'low'],
                            display: 'outside',
                            font: '10px Arial',
                            renderer: this.onSeriesLabelRender
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

    onSeriesLabelRender(value) {
        return value.toFixed(1);
    }

    onSeriesTooltipRender(tooltip, record, context) {
        tooltip.setHtml(record.get('month') + ': ' + record.get(context.field) + '&#176;C');
    }
}