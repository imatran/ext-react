import React from 'react';
import { Container, Label, TextField, Button, Checkbox, Radio, Combobox } from 'lib/modules';
import { ClearTextField, MenuTool } from 'lib/modules';
import { Store } from './Store';
import './Hello.css';

export class Hello extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            helloName: 'World',
            showLabel: true,
            boldLabel: false,
            comboValue: 'World'
        };

        this.store = Store.create();
    }

    render() {
        // console.log('Hello');

        return (
            <div className='main'>
                <Container>
                    <Container layout='hbox'>
                        <Container flex={1}>
                            <Label
                                text={`Hello ${this.state.helloName} 1!`}
                                hidden={!this.state.showLabel}
                            />
                        </Container>

                        <Checkbox
                            boxLabel={this.state.showLabel ? 'Hide' : 'Show'}
                            labelSeparator={''}
                            hideLabel={true}
                            checked={this.state.showLabel}
                            handler={this.onHideLabel.bind(this)}
                            flex={1}
                        />
                    </Container>

                    <Container>
                        <Container layout='hbox'>
                            <Container flex={1}>
                                <Label
                                    text={`Hello ${this.state.helloName} 2!`}
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

                        <Container layout='hbox'>
                            <Container flex={1}>
                                <Container>
                                    <Label
                                        text={`Hello ${this.state.comboValue} 3!`}
                                        flex={1}
                                    />
                                </Container>
                            </Container>

                            <Container layout='hbox' flex={1}>
                                <Combobox
                                    store={this.store}
                                    displayField={'value'}
                                    flex={1}
                                    editable={false}
                                    onChange={this.onChange.bind(this)}
                                />

                                <MenuTool
                                    iconCls='x-fa fa-ellipsis-h'
                                    margin='8 0 0 10'
                                    menu={[{
                                        text: 'Jane Doe',
                                        handler: this.onHelloMenuSubmit.bind(this),
                                        width: 80
                                    }, {
                                        text: 'John Doe',
                                        handler: this.onHelloMenuSubmit.bind(this),
                                        width: 80
                                    }, {
                                        text: 'World',
                                        handler: this.onHelloMenuSubmit.bind(this),
                                        width: 80
                                    }]}
                                />
                            </Container>
                        </Container>
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

                        <ClearTextField
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
            helloName: value,
            comboValue: value
        });
    }

    onHelloInputChange(field, value) {
        this.setState({helloInput: value});
    }

    onHelloInputSubmit() {
        this.setState({
            helloName: this.state.helloInput,
            comboValue: this.state.helloInput,
            helloInput: null
        });
    }

    onHelloMenuSubmit(menu) {
        this.setState({
            comboValue: menu.text
        });
    }

    onHideLabel(field, value) {
        this.setState({showLabel: value});
    }

    onBoldLabel() {
        this.setState({boldLabel: !this.state.boldLabel});
        return false;
    }

    onChange(field, value) {
        this.setState({comboValue: value});
    }

}
