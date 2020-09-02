/**
 * Created by atran on 02/09/2020.
 */
import React from 'react';
import { Box } from './Box';

export class HBox extends Box {

    constructor(props) {
        super(props);

        this.state = {
            totalWidth: 0,
            flexSize: 0
        };

        this.offsetWidth = 0;
    }

    componentDidMount() {
        let totalFlex = this.getTotalFlex(),
            totalWidth = this.boxRef.current.offsetWidth - this.offsetWidth;

        this.setState({
            totalWidth: totalWidth,
            flexSize: totalWidth / totalFlex
        });
    }

    render() {
        let props = this.getProps(),
            items = this.getItems();

        props.className = (props.className ? props.className + ' ' : '') + 'flex-box';
        return (
            <div ref={this.boxRef} {...props}>
                {items}
            </div>
        );
    }

    getItems() {
        let items = [];

        React.Children.forEach(this.props.children, (child, index) => {
            let width = child['props'].width,
                flex = child['props'].flex;

            if(!width) {
                width = this.state.flexSize * (flex || 1);
            }

            if(!width) {
                items.push(
                    <div key={index} className='flex-fill'>{child}</div>
                );
            } else {
                items.push(
                    <div key={index} style={{width: width}}>{child}</div>
                );
            }
        });

        return items;
    }

    getTotalFlex() {
        let totalFlex = 0;

        React.Children.forEach(this.props.children, (child) => {
            let width = child['props'].width,
                flex = child['props'].flex;

            if(!width) {
                totalFlex += (flex || 1);
            } else {
                this.offsetWidth += width;
            }
        });

        return totalFlex;
    }

}