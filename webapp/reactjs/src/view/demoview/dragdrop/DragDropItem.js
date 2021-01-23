import React from 'react';
import { ExtContainer } from 'lib/ext-components';
import './styles.scss';

Ext.require([
    'Ext.dd.DragZone'
]);

export class DragDropItem extends React.Component {

    render() {
        return (
            <ExtContainer
                style={`background-color: ${this.props.color}`}
                className='dragdrop-item'
                onRender={this.initDragZone.bind(this)}
            />
        );
    }

    initDragZone(me) {
        this.dragZone = new Ext.dd.DragZone(me.getEl(), {
            getDragData: () => {
                const sourceEl = me.getEl().dom;
                if(sourceEl) {
                    const d = sourceEl.cloneNode(true);
                    return {
                        ddel: d,
                        sourceEl: sourceEl,
                        repairXY: me.getEl().getXY(),
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