import React from 'react';
import { ExtLabel, ExtTextField, ExtButton, ExtCheckBox, ExtRadio, ExtComboBox, ExtSpacer } from 'lib/ext-components';
import { ExtClearTextField, ExtMenuTool } from 'lib/ext-components';
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
                    <ExtLabel
                        text={`Hello ${this.state.helloName} 1!`}
                        hidden={!this.state.showLabel}
                    />

                    <ExtCheckBox
                        boxLabel={this.state.showLabel ? 'Hide' : 'Show'}
                        labelSeparator=''
                        hideLabel={true}
                        checked={this.state.showLabel}
                        handler={this.onHideLabel.bind(this)}
                    />
                </HBox>

                <HBox>
                    <ExtLabel
                        text={`Hello ${this.state.helloName} 2!`}
                        style={{fontWeight: this.state.boldLabel ? '700' : '300'}}
                    />

                    <ExtRadio
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
                    <ExtLabel
                        text={`Hello ${this.state.comboValue} 3!`}
                    />

                    <HBox>
                        <ExtComboBox
                            store={this.store}
                            displayField='value'
                            editable={false}
                            onChange={this.onChange.bind(this)}
                        />

                        <ExtMenuTool
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

                <ExtSpacer height={10}/>
                <HBox>
                    <ExtLabel
                        text='Change Name:'
                    />

                    <ExtTextField
                        onChange={this.onHelloNameChange.bind(this)}
                    />
                </HBox>

                <ExtSpacer height={10}/>
                <HBox>
                    <ExtButton
                        text='Change Name'
                        handler={this.onHelloInputSubmit.bind(this)}
                        disabled={!this.state.helloInput}
                    />

                    <ExtClearTextField
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
