import React from 'react';
import { ExtContainer } from 'lib/ext-components';
import { DragDropTile } from './DragDropTile';
import data from './data.json';
import './styles.scss';

export class DragDrop extends React.Component {

    constructor(props) {
        super(props);

        this.buckets = data.buckets;
        this.colors = data.colors;
    }

    render() {
        const buckets = this.buckets.map((buckets, index) => {
            const items = buckets.map((item, index) => {
                const reducer = (p, v) => { v.bucket === item.id && p.push(v); return p; };
                return (
                    <DragDropTile
                        key={index}
                        bucket={item.id}
                        title={item.title}
                        width={this.props.width / 2}
                        height={this.props.height / 2}
                        colors={this.colors.reduce(reducer, [])}
                    />
                );
            });

            return (
                <ExtContainer
                    key={index}
                    layout={{ type: 'hbox', align: 'stretch' }}
                    flex={1}
                >
                    {items}
                </ExtContainer>
            );
        });

        return (
            <ExtContainer layout='fit'>
                {buckets}
            </ExtContainer>
        );
    }

}