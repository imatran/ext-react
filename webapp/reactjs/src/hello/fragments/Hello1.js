import React from 'react';
import { Container, Checkbox, Label } from 'lib/modules';

export class Hello1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showLabel: true
        };
    }

    render() {
        // console.log('Hello1');

        return(
            <Container layout='hbox'>
                <Container flex={1}>
                    <Label
                        text={`Hello ${this.props.helloName} 1!`}
                        hidden={!this.state.showLabel}
                    />
                </Container>

                <Checkbox
                    boxLabel={this.state.showLabel ? 'Hide' : 'Show'}
                    labelSeparator=''
                    hideLabel={true}
                    checked={this.state.showLabel}
                    handler={this.onHideLabel.bind(this)}
                    flex={1}
                />
            </Container>
        );

    }

    onHideLabel() {
        this.setState(state => ({
            showLabel: !state.showLabel
        }));
    }
}
