import React from 'react';
import { Label, TextField, Button, Checkbox, Radio, Combobox, Spacer } from 'lib/ext-components';
import { ClearTextField, MenuTool } from 'lib/ext-components';
import { HBox, VBox } from 'src/component/box';
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

        return (
            <VBox className='main'>
                <HBox>
                    <Label
                        text={`Hello ${this.state.helloName} 1!`}
                        hidden={!this.state.showLabel}
                    />

                    <Checkbox
                        boxLabel={this.state.showLabel ? 'Hide' : 'Show'}
                        labelSeparator=''
                        hideLabel={true}
                        checked={this.state.showLabel}
                        handler={this.onHideLabel.bind(this)}
                    />
                </HBox>

                <HBox>
                    <Label
                        text={`Hello ${this.state.helloName} 2!`}
                        style={{fontWeight: this.state.boldLabel ? '700' : '300'}}
                    />

                    <Radio
                        boxLabel={this.state.boldLabel ? 'Regular' : 'Bold'}
                        labelSeparator=''
                        hideLabel={true}
                        value={this.state.boldLabel}
                        onClick={{
                            fn: this.onBoldLabel.bind(this),
                            element: 'el'
                        }}
                    />
                </HBox>

                <HBox>
                    <Label
                        text={`Hello ${this.state.comboValue} 3!`}
                    />

                    <HBox>
                        <Combobox
                            store={this.store}
                            displayField='value'
                            editable={false}
                            onChange={this.onChange.bind(this)}
                        />

                        <MenuTool
                            iconCls='x-fa fa-ellipsis-h'
                            margin='8 0 0 10'
                            width={26}
                            menu={[{
                                text: 'Jane Doe',
                                handler: this.onHelloMenuSubmit.bind(this)
                            }, {
                                text: 'John Doe',
                                handler: this.onHelloMenuSubmit.bind(this)
                            }, {
                                text: 'World',
                                handler: this.onHelloMenuSubmit.bind(this)
                            }]}
                        />
                    </HBox>
                </HBox>

                <Spacer height={10}/>
                <HBox>
                    <Label
                        text='Change Name:'
                    />

                    <TextField
                        onChange={this.onHelloNameChange.bind(this)}
                    />
                </HBox>

                <Spacer height={10}/>
                <HBox>
                    <Button
                        text='Change Name'
                        handler={this.onHelloInputSubmit.bind(this)}
                        disabled={!this.state.helloInput}
                    />

                    <ClearTextField
                        value={this.state.helloInput}
                        onChange={this.onHelloInputChange.bind(this)}
                    />
                </HBox>
            </VBox>
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
