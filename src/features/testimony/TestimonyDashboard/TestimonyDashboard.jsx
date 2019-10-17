import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import TestimonyList from '../TestimonyList/TestimonyList';
import TestimonyActivity from '../TestimonyActivity/TestimonyActivity';
import { createTestimony, deleteTestimony, updateTestimony } from '../testimonyActions';


const mapStateToProps = (state) => ({
  testimony: state.firestore.ordered.testimonies
})

const mapDispatchToProps = {
  createTestimony,
  deleteTestimony,
  updateTestimony
}

class TestimonyDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
         
        }
    }


    // //this will delete any selected event.
    // handleDeleteTestimony = (testimionyId) => () => {
    //  this.props.deleteTestimony(testimionyId);
    // }


    render() {
     
        const { testimony } = this.props;
        return (
            
            <Grid>
                <Grid.Column width={10}>
                    <TestimonyList testimonies={testimony}   onEditTestimony={this.handleOpenTestimony}   deleteTestimony={this.handleDeleteTestimony} />
                </Grid.Column>
                <Grid.Column width={6}>
                <TestimonyActivity/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(firestoreConnect([{ collection: 'testimonies' }])(TestimonyDashboard));