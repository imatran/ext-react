/**
 * Created by atran on 02/09/2020.
 */
import React from 'react';
import './styles.scss';

export class Box extends React.Component {

    constructor(props) {
        super(props);

        this.boxRef = React.createRef();
    }

    render() {
        let props = this.getProps();

        props.className = (props.className ? props.className + ' ' : '') + 'box-layout';
        return (
            <div ref={this.boxRef} {...props}>
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

                default:
                    props[key] = value;
            }
        }

        return props;
    }

}