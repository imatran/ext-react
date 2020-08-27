import React from 'react';
import { Container, TextField, Button, Label } from 'lib/ext-components';
import { Hello1 } from './Hello1';
import { Hello2 } from './Hello2';
import { Hello3 } from './Hello3';
import '../Hello.css';

export class Hello extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            helloName: 'World',
            helloInput: null
        };
    }

    render() {
        // console.log('Hello');

        return (
            <div className='main'>
                <Container>
                    <Hello1 helloName={this.state.helloName}/>

                    <Container>
                        <Hello2 helloName={this.state.helloName}/>
                        <Hello3 helloName={this.state.helloName}/>
                    </Container>

                    <div className='spacer'/>

                    <Container layout='hbox'>
                        <Label
                            flex={1}
                            text='Change Name:'
                        />

                        <TextField
                            flex={1}
                            onChange={this.onHelloNameChange.bind(this)}
                        />
                    </Container>

                    <div className='spacer'/>

                    <Container layout='hbox'>
                        <Container flex={1}>
                            <Button
                                text='Change Name'
                                handler={this.onHelloInputSubmit.bind(this)}
                                disabled={!this.state.helloInput}
                            />
                        </Container>

                        <TextField
                            flex={1}
                            value={this.state.helloInput}
                            onChange={this.onHelloInputChange.bind(this)}
                        />
                    </Container>
                </Container>
            </div>
        );

    }

    onHelloNameChange(field, value) {
        this.setState({
            helloName: value
        });
    }

    onHelloInputChange(field, value) {
        this.setState({
            helloInput: value
        });
    }

    onHelloInputSubmit() {
        this.setState({
            helloName: this.state.helloInput,
            helloInput: null
        });
    }

}
