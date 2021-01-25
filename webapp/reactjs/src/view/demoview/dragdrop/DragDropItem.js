import React from 'react';
import { ExtContainer } from 'lib/ext-components';

Ext.require([
    'Ext.dd.DragZone'
]);

export class DragDropItem extends React.Component {

    render() {
        return (
            <ExtContainer ref={c => this.ddItemRef = c}
                style={`background-color: ${this.props.color}`}
                className='dragdrop-item'
            />
        );
    }

    componentDidMount() {
        const cmp = this.ddItemRef.getExtComponent();

        cmp.dragZone = new Ext.dd.DragZone(cmp.getEl(), {
            getDragData: () => {
                const sourceEl = cmp.getEl().dom;
                if(sourceEl) {
                    const d = sourceEl.cloneNode(true);
                    return {
                        ddel: d,
                        sourceEl: sourceEl,
                        repairXY: cmp.getEl().getXY(),
                        item: this.props.item,
                        tile: this.props.tile
                    }
                }
            },

            getRepairXY: function() {
                return this.dragData.repairXY;
            }
        });
    }

}