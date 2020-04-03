import React from 'react';
import { Container, Combobox, Label } from 'lib/modules';
import { Store } from '../Store';

export class Hello3 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            helloName: props.helloName
        };

        this.store = Store.create();
    }

    render() {
        // console.log('Hello 3');

        return(

            <Container layout='hbox'>

                <Container flex={1}>
                    <Container>
                        <Label
                            text={`Hello ${this.state.helloName} 3!`}
                            flex={1}
                        />
                    </Container>
                </Container>

                <Combobox
                    store={this.store}
                    displayField={'value'}
                    flex={1}
                    editable={false}
                    onChange={this.onChange.bind(this)}
                />

            </Container>

        );

    }

    componentDidUpdate(prevProps) {
        if(prevProps.helloName !== this.props.helloName) {
            this.setState({helloName: this.props.helloName});
        }
    }

    onChange(field, value) {
        this.setState({helloName: value});
    }
}