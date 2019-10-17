import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import TestimonyDetailedHeader from './TestimonyDetailedHeader';
import TestimonyDetailedInfo from './TestimonyDetailedInfo';
import TestimonyDetailedChat from './TestimonyDetailedChat';
 


//mapstate to props to retrive testimony by it's particular ID in redux using ownProps to check if the selected event matches with the ownProps route params id
const mapStateToProps = (state, ownProps) => {
    const testimonyId = ownProps.match.params.id;

    let testimony = {};

    if(testimonyId && state.testimony.length > 0){

        testimony = state.testimony.filter(testimony => testimony.id === testimonyId)[0];
    }

    return {
        testimony
    }

}


class TestimonyDetailedPage extends Component {
    render() { 
        const { testimony } = this.props;
        return (
        <Grid>
            <Grid.Column width={16}>
               <TestimonyDetailedHeader testimony={testimony} />
               <TestimonyDetailedInfo testimony={testimony}  />
               <TestimonyDetailedChat testimony={testimony}  />
            </Grid.Column>
        </Grid>
        );
    }
}
 
export default connect(mapStateToProps)(TestimonyDetailedPage);