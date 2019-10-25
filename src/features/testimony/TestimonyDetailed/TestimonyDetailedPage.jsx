import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import TestimonyDetailedHeader from './TestimonyDetailedHeader';
import TestimonyDetailedInfo from './TestimonyDetailedInfo';
import TestimonyDetailedChat from './TestimonyDetailedChat';



const mapStateToProps = (state) => {
    let testimony = {}
  
    if(state.firestore.ordered.testimonies && state.firestore.ordered.testimonies[0]) {
      testimony = state.firestore.ordered.testimonies[0]
    }
  
    return {
     testimony
    }
  
  }


class TestimonyDetailedPage extends Component {

    async componentDidMount() {
      const { firestore, match } = this.props;
      await firestore.setListener(`testimonies/${match.params.id}`);
    }

    async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`testimonies/${match.params.id}`);
    }
  
    render() { 
        const { testimony } = this.props;
        return (
        <Grid>
            <Grid.Column width={16}>
               <TestimonyDetailedHeader testimony={testimony} />
               <TestimonyDetailedInfo testimony={testimony}  />
               <TestimonyDetailedChat />
            </Grid.Column>
        </Grid>
        );
    }
}
 
export default withFirestore(connect(mapStateToProps)(TestimonyDetailedPage));