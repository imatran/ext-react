import React from 'react';
import { ExtContainer, ExtTextField, ExtButton, ExtLabel } from 'lib/ext-components';
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
                <ExtContainer>
                    <Hello1 helloName={this.state.helloName}/>

                    <ExtContainer>
                        <Hello2 helloName={this.state.helloName}/>
                        <Hello3 helloName={this.state.helloName}/>
                    </ExtContainer>

                    <div className='spacer'/>

                    <ExtContainer layout='hbox'>
                        <ExtLabel
                            flex={1}
                            text='Change Name:'
                        />

                        <ExtTextField
                            flex={1}
                            onChange={this.onHelloNameChange.bind(this)}
                        />
                    </ExtContainer>

                    <div className='spacer'/>

                    <ExtContainer layout='hbox'>
                        <ExtContainer flex={1}>
                            <ExtButton
                                text='Change Name'
                                handler={this.onHelloInputSubmit.bind(this)}
                                disabled={!this.state.helloInput}
                            />
                        </ExtContainer>

                        <ExtTextField
                            flex={1}
                            value={this.state.helloInput}
                            onChange={this.onHelloInputChange.bind(this)}
                        />
                    </ExtContainer>
                </ExtContainer>
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
