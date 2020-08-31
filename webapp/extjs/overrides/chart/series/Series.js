/**
 * Created by atran on 2020-08-31.
 */
Ext.define('React.overrides.chart.series.Series', {
    override: 'Ext.chart.series.Series',

    /**
     * Fixed bug when resizing charts in 6.2.0
     */
    updateLabel: function () {
        var chart = this.getChart();

        if (chart && !chart.isInitializing) {
            //chart.redraw();
        }
    }
});