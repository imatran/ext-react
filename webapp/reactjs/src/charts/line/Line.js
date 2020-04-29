import React from 'react';
import { Container, CartesianChart } from 'lib/modules';
import data from './data';

Ext.require([
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.Line',
    'Ext.chart.interactions.ItemHighlight',
    'Ext.data.Store'
]);

export class Line extends React.Component {
    constructor(props) {
        super(props);

        this.store = Ext.create('Ext.data.Store', {
            fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
            data: data
        });
    }

    render() {
        return(
            <Container layout='fit'>
                <CartesianChart
                    store={this.store}
                    height={this.props.height}
                    innerPadding={20}
                    insetPadding='10 10 0 0'

                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        renderer: this.onAxisLabelRender
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
                        type: 'line',
                        xField: 'month',
                        yField: 'data1',

                        marker: {
                            radius: 3,
                            lineWidth: 1
                        },

                        highlight: {
                            radius: 5,
                            lineWidth: 2,
                            fillStyle: '#000',
                            strokeStyle: '#fff'
                        },

                        tooltip: {
                            trackMouse: true,
                            showDelay: 0,
                            dismissDelay: 0,
                            hideDelay: 0,
                            renderer: this.onSeriesTooltipRender
                        }
                    }, {
                        type: 'line',
                        xField: 'month',
                        yField: 'data2',

                        marker: {
                            radius: 3,
                            lineWidth: 1
                        },

                        highlight: {
                            radius: 5,
                            lineWidth: 2,
                            fillStyle: '#000',
                            strokeStyle: '#fff'
                        },

                        tooltip: {
                            trackMouse: true,
                            showDelay: 0,
                            dismissDelay: 0,
                            hideDelay: 0,
                            renderer: this.onSeriesTooltipRender
                        }
                    }, {
                        type: 'line',
                        xField: 'month',
                        yField: 'data3',

                        marker: {
                            radius: 3,
                            lineWidth: 1
                        },

                        highlight: {
                            radius: 5,
                            lineWidth: 2,
                            fillStyle: '#000',
                            strokeStyle: '#fff'
                        },

                        tooltip: {
                            trackMouse: true,
                            showDelay: 0,
                            dismissDelay: 0,
                            hideDelay: 0,
                            renderer: this.onSeriesTooltipRender
                        }
                    }, {
                        type: 'line',
                        xField: 'month',
                        yField: 'data4',

                        marker: {
                            radius: 3,
                            lineWidth: 1
                        },

                        highlight: {
                            radius: 5,
                            lineWidth: 2,
                            fillStyle: '#000',
                            strokeStyle: '#fff'
                        },

                        tooltip: {
                            trackMouse: true,
                            showDelay: 0,
                            dismissDelay: 0,
                            hideDelay: 0,
                            renderer: this.onSeriesTooltipRender
                        }
                    }]}
                />
            </Container>
        );
    }

    onAxisLabelRender(axis, label, layoutContext) {
        return layoutContext.renderer(label) + '%';
    }

    onSeriesTooltipRender(tooltip, record, context) {
        tooltip.setHtml(record.get('month') + ': ' + record.get(context.field) + '%');
    }
}