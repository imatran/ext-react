import React from 'react';
import { ExtContainer, ExtLabel, ExtPanel } from 'lib/ext-components';
import { DragDropItem } from './DragDropItem';

Ext.require([
    'Ext.dd.DropZone',
    'Ext.layout.container.Table'
]);

export class DragDropTile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            colors: this.props.colors
        };
    }

    render() {
        const colors = this.state.colors.map((item, index) => {
            return (
                <DragDropItem
                    key={index}
                    color={item.color}
                    item={item}
                    tile={this}
                />
            );
        });

        return (
            <ExtContainer
                layout={{ type: 'vbox', align: 'stretch' }}
                className='dragdrop-tile'
                width={this.props.width}
                height={this.props.height}
                flex={1}
                padding={3}
                onRender={this.initDropZone.bind(this)}
            >
                <ExtLabel
                    className='title'
                    html={`<span>${this.props.title}</span>`}
                    padding={'0 0 0 4'}
                />

                <ExtPanel
                    layout={{ type: 'table', columns: 2 }}
                    className='tiles'
                    flex={1}
                    padding={'4 0 4 4'}
                    scrollable={true}
                >
                    {colors}
                </ExtPanel>
            </ExtContainer>
        );
    }

    initDropZone(me) {
        me.dropZone = new Ext.dd.DropZone(me.getEl(), {
            getTargetFromEvent: (e) => {
                return e.getTarget(`.${me.cls}`);
            },

            onNodeOver: (target, dd, e, data) => {
                const allow = this.props.bucket !== data.item.bucket;
                return allow ? Ext.dd.DropZone.prototype.dropAllowed : Ext.dd.DropZone.prototype.dropNotAllowed;
            },

            onNodeDrop: (target, dd, e, data) => {
                if(this.props.bucket !== data.tile.props.bucket) {
                    this.swapItem(data.tile, data.item);
                }
            }
        });
    }

    swapItem(source, item) {
        //remove item from source tile
        let colors = source.state.colors.reduce((p, v) => { v.id !== item.id && p.push(v); return p; }, []);
        source.setState({
            colors: colors
        });

        //add item to this tile
        item.bucket = this.props.bucket;
        this.state.colors.push(item);
        this.setState({
            colors: this.state.colors
        });
    }

}