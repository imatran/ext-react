import React from 'react';
import { connect } from 'react-redux';
import { ExtContainer } from 'lib/ext-components';
import { Hello1 } from 'src/view/demoview/hello/fragments/Hello1';
import { Hello2 } from 'src/view/demoview/hello/fragments/Hello2';
import { Hello3 } from 'src/view/demoview/hello/fragments/Hello3';

const ConnectedConsumer = props => {
    // console.log('Consumer');

    return(
        <>
            <Hello1 helloName={props.helloName}/>

            <ExtContainer>
                <Hello2 helloName={props.helloName}/>
                <Hello3 helloName={props.helloName}/>
            </ExtContainer>

            <div className='spacer'/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        helloName: state.helloName
    };
};

export const Consumer = connect(mapStateToProps)(ConnectedConsumer);