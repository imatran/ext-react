import React from 'react';
import { ExtContainer, ExtCheckBox, ExtLabel } from 'lib/ext-components';

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
            <ExtContainer layout='hbox'>
                <ExtContainer flex={1}>
                    <ExtLabel
                        text={`Hello ${this.props.helloName} 1!`}
                        hidden={!this.state.showLabel}
                    />
                </ExtContainer>

                <ExtCheckBox
                    boxLabel={this.state.showLabel ? 'Hide' : 'Show'}
                    labelSeparator=''
                    hideLabel={true}
                    checked={this.state.showLabel}
                    handler={this.onHideLabel.bind(this)}
                    flex={1}
                />
            </ExtContainer>
        );

    }

    onHideLabel() {
        this.setState(state => ({
            showLabel: !state.showLabel
        }));
    }
}
