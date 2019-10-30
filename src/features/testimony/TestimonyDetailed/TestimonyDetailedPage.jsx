import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { withFirestore, isEmpty, firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import TestimonyDetailedHeader from './TestimonyDetailedHeader';
import TestimonyDetailedInfo from './TestimonyDetailedInfo';
import TestimonyDetailedChat from './TestimonyDetailedChat';
import { addTestimonyComment } from '../testimonyActions';
import { createDataTree, objectToArray } from '../../../app/common/utils/helpers';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
import { openModal } from '../../modals/modalActions';



const mapStateToProps = (state, ownProps) => {
    let testimony = {}
  
    if(state.firestore.ordered.testimonies && state.firestore.ordered.testimonies[0]) {
      testimony = state.firestore.ordered.testimonies[0]
    }
  
    return {
      requesting: state.firestore.status.resquesting,
      testimony,
      loading: state.firebase.loading,
      auth: state.firebase.auth,
      testimonyChat: !isEmpty(state.firebase.data.testimony_chat) && objectToArray(state.firebase.data.testimony_chat[ownProps.match.params.id])
    }
  
  }

  const mapDispatchToProps = {

    addTestimonyComment,
    openModal
  }


class TestimonyDetailedPage extends Component {


  state = {
    initialLoading: true
  }
 

    async componentDidMount() {
      const { firestore, match } = this.props;
      let testimony =  await firestore.get(`testimonies/${match.params.id}`);

      if(!testimony.exists) {
        toastr.error('Not Found', 'This is not the event you are looking for');
        this.props.history.push('/error');
    }
      await firestore.setListener(`testimonies/${match.params.id}`);
      
      this.setState({
          initialLoading: false
      })
    }

    async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`testimonies/${match.params.id}`);
    }
  


    render() { 
        const {openModal, auth, testimony, testimonyChat, loading,  addTestimonyComment } = this.props;


          //sorting event chat to have its own reply assigned to it
          const chatTree = !isEmpty(testimonyChat) && createDataTree(testimonyChat);
  //         //for anonimouse users
          const authenticated = auth.isLoaded && !auth.isEmpty;
  //         //for loading indicator
          // const Loadingflag = requesting[`testimonies/${match.params.id}`];
          // if (Loadingflag || this.state.initialLoading) return <LoadingComponent inverted={true} />


        return (
        <Grid>
            <Grid.Column width={16}>
               <TestimonyDetailedHeader
               loading={loading}
                testimony={testimony} 
                authenticated={authenticated}
                openModal={openModal}
                />   
               <TestimonyDetailedInfo testimony={testimony}  />

               {authenticated &&
               <TestimonyDetailedChat 
                  addTestimonyComment={addTestimonyComment}
                  testimonyId={testimony.id}
                  testimonyChat={chatTree}
               />}


            </Grid.Column>
        </Grid>
        );
    }
}
 
export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect((props) => ([`testimony_chat/${props.match.params.id}`]))
)(TestimonyDetailedPage);