import React from 'react';
import { Container, CartesianChart } from 'lib/modules';
import data from './data';

Ext.require([
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.Bar'
]);

export class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.store = Ext.create('Ext.data.Store', {
            fields: ['country', 'agr', 'ind', 'ser'],
            data: data
        });
    }

    render() {
        return(
            <Container layout='fit'>
                <CartesianChart
                    store={this.store}
                    height={this.props.height}
                    innerPadding={10}
                    insetPadding='10 10 0 0'
                    flipXY={true}

                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        renderer: this.onAxisLabelRender,
                        label: {
                            fontSize: '10px'
                        }
                    }, {
                        type: 'category',
                        position: 'left',
                        label: {
                            fontSize: '10px'
                        }
                    }]}

                    series={[{
                        type: 'bar',
                        xField: 'country',
                        yField: 'ind',

                        style: {
                            opacity: 0.80,
                            minGapWidth: 10
                        },

                        highlightCfg: {
                            strokeStyle: 'black',
                            radius: 10
                        },

                        label: {
                            field: 'ind',
                            display: 'insideEnd',
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

    onAxisLabelRender(axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    }

    onSeriesLabelRender(value) {
        return Ext.util.Format.number(value / 1000, '0,000');
    }

    onSeriesTooltipRender(tooltip, record) {
        const formatString = '0,000 (millions of USD)';
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('ind'), formatString));
    }
}