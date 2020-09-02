import React from 'react';
import './Box.css';

export class Box extends React.Component {

    constructor(props) {
        super(props);

        this.boxRef = React.createRef();
    }

    render() {
        const props = this.getProps();

        return (
            <div ref={this.boxRef} style={{...props}}>
                {this.props.children}
            </div>
        );
    }

    getProps() {
        let props = {};

        for (const [key, value] of Object.entries(this.props)) {
            switch(key) {
                case 'children':
                    //do nothing
                    break;

                case 'margin':
                case 'padding':
                    props[key] = this.getPadding(value);
                    break;

                default:
                    props[key] = value;
            }
        }

        return props;
    }

    getPadding(value) {
        let padding = '';

        value.split(/\s+/).forEach(val => {
            padding.length > 0 && (padding += ' ');
            padding += `${val}px`
        });

        return padding;
    }

}