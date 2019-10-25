import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import TestimonyList from '../TestimonyList/TestimonyList';
import TestimonyActivity from '../TestimonyActivity/TestimonyActivity';
// import LoadingComponent from '../../../app/layout/LoadingComponent';


const mapStateToProps = (state) => ({
  testimony: state.firestore.ordered.testimonies

})

class TestimonyDashboard extends Component {

    // //this will delete any selected event.
    // handleDeleteTestimony = (testimionyId) => () => {
    //  this.props.deleteTestimony(testimionyId);
    // }
    render() {
        const { testimony } = this.props;
        // if (!isLoaded(testimony) || isEmpty(testimony)) return <LoadingComponent inverted={true} />;


        return (
            
            <Grid>
                <Grid.Column width={10}>
                    <TestimonyList testimonies={testimony} />
                </Grid.Column>
                <Grid.Column width={6}>
                <TestimonyActivity/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps)(
    firestoreConnect([{ collection: 'testimonies' }])(TestimonyDashboard)
);