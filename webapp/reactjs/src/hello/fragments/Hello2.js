import React from 'react';
import {Container, Label, Radio} from 'lib/modules';

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

            <Container layout='hbox'>

                <Container flex={1}>
                    <Label
                        text={`Hello ${this.props.helloName} 2!`}
                        style={{fontWeight: this.state.boldLabel ? '700' : '300'}}
                    />
                </Container>

                <Radio
                    boxLabel={this.state.boldLabel ? 'Regular' : 'Bold'}
                    labelSeparator={''}
                    hideLabel={true}
                    value={this.state.boldLabel}
                    flex={1}
                    onClick={{
                        fn: this.onBoldLabel.bind(this),
                        element: 'el'
                    }}
                />

            </Container>

        );

    }

    onBoldLabel() {
        this.setState(state => ({
            boldLabel: !state.boldLabel
        }));
        return false;
    }
}