/**
 * Created by atran on 2020-04-22.
 */
Ext.define('React.overrides.chart.CartesianChart', {
    override: 'Ext.chart.CartesianChart',

    redraw: function () {
        let me = this,
            series, xaxis, yaxis, skip = false;

        if(me.series) {
            for(let i = 0; i < me.series.length; i++) {
                series = me.series[0];
                xaxis = series.getXAxis();
                yaxis = series.getYAxis();
                skip = skip || xaxis && xaxis.destroyed || yaxis && yaxis.destroyed;
            }

            if(!skip) {
                me.callParent(arguments);
            }
        }
    }
});