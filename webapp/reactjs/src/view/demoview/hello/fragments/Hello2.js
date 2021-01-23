import React from 'react';
import { ExtContainer, ExtLabel, ExtRadio } from 'lib/ext-components';

export class Hello2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boldLabel: false
        };
    }

    render() {
        // console.log('Hello 2');

        return(
            <ExtContainer layout='hbox'>
                <ExtContainer flex={1}>
                    <ExtLabel
                        text={`Hello ${this.props.helloName} 2!`}
                        style={{fontWeight: this.state.boldLabel ? '700' : '300'}}
                    />
                </ExtContainer>

                <ExtRadio
                    boxLabel={this.state.boldLabel ? 'Regular' : 'Bold'}
                    labelSeparator=''
                    hideLabel={true}
                    value={this.state.boldLabel}
                    flex={1}
                    onClick={{
                        fn: this.onBoldLabel.bind(this),
                        element: 'el'
                    }}
                />
            </ExtContainer>
        );

    }

    onBoldLabel() {
        this.setState(state => ({
            boldLabel: !state.boldLabel
        }));
        return false;
    }
}
