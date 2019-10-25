import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field} from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Grid, Header, Segment, Form , Button } from 'semantic-ui-react';
import { createTestimony, updateTestimony  } from '../testimonyActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';


const mapDispatchToProps = {
  createTestimony,
  updateTestimony
}


const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  testi: composeValidators(
    isRequired({message: 'Please enter your testimony'}),
    hasLengthGreaterThan(4)({message: 'Testimony needs at least 5 characters'})
  )(),
  date: isRequired('date')
});


const mapStateToProps = (state) => {

  let testimony = {};
  if(state.firestore.ordered.testimonies && state.firestore.ordered.testimonies[0]) {
    testimony = state.firestore.ordered.testimonies[0];
  }
  return {
   initialValues: testimony
  }

}

class TestimonyForm extends Component {


    onFormSubmit = async (values) => {
        if(this.props.initialValues.id){
         await this.props.updateTestimony(values);
         this.props.history.push('/testimony');
       
        }else{
     
          this.props.createTestimony(values);
          this.props.history.push('/testimony');

        }        
    }


    async componentDidMount() {
      const { firestore, match } = this.props;
      await firestore.setListener(`testimonies/${match.params.id}`);
    
     
    }

    async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`testimonies/${match.params.id}`);
    }
  

    render() {
      const { invalid, submitting, pristine, handleSubmit } = this.props;
        return (
          <Grid>
            <Grid.Column width={10}>
                <Segment>
                <Header sub color="teal" content="Add Testimony"/>
                  <Form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}> 
                    <Field type="text" name="title" component={TextInput} placeholder="Enter testimony title" />  
                    <Field name="date" type="text" component={DateInput} placeholder="Date and Time" dateFormat="YYYY-MM-DD HH:mm" timeFormat='HH:mm' showTimeSelect />   
                    <Field typtestimonye="text" name="testi" component={TextArea}  placeholder="Tell us your testimony"/>
                    
                      <Button disabled={invalid || submitting || pristine} color="red" type="submit"> Submit </Button>
                      <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                  </Form>
                </Segment>
            </Grid.Column>
          </Grid>
        )
    }
}

export default withFirestore(connect(mapStateToProps,mapDispatchToProps)(reduxForm({ form: 'testimonyForm', enableReinitialize:true, validate })(TestimonyForm)));