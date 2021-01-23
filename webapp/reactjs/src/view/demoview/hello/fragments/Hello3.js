import React from 'react';
import { ExtContainer, ExtComboBox, ExtLabel } from 'lib/ext-components';
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
            <ExtContainer layout='hbox'>
                <ExtContainer flex={1}>
                    <ExtContainer>
                        <ExtLabel
                            text={`Hello ${this.state.helloName} 3!`}
                            flex={1}
                        />
                    </ExtContainer>
                </ExtContainer>

                <ExtComboBox
                    store={this.store}
                    displayField='value'
                    flex={1}
                    editable={false}
                    onChange={this.onChange.bind(this)}
                />
            </ExtContainer>
        );

    }

    componentDidUpdate(prevProps, provState, snapshot) {
        if(prevProps.helloName !== this.props.helloName) {
            this.setState({helloName: this.props.helloName});
        }
    }

    onChange(field, value) {
        this.setState({helloName: value});
    }
}
