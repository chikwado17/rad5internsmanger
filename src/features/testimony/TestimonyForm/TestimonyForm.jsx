import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { combineValidators, composeValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import cuid from 'cuid';
import moment from 'moment';
import { Segment, Form , Button } from 'semantic-ui-react';
import { createTestimony, updateTestimony  } from '../testimonyActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';



//adding validation message for our redux form
//pass the validate down to export default EventForm reduxForm initialization
const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  postedBy: isRequired({message: 'Posted By who? -> required'}),
  testi: composeValidators(
    isRequired({message: 'Please enter your testimony'}),
    hasLengthGreaterThan(4)({message: 'Testimony needs at least 5 characters'})
  )(),
  date: isRequired('date')
});


//mapstate to props to retrive testimony by it's particular ID in redux using ownProps to check if the selected event matches with the ownProps route params id
const mapStateToProps = (state, ownProps) => {
  const testimonyId = ownProps.match.params.id;

  let testimony = {};

  if(testimonyId && state.testimony.length > 0){

      testimony = state.testimony.filter(testimony => testimony.id === testimonyId)[0];
  }

  return {
    initialValues: testimony,
    testimony
  }

}



const mapDispatchToProps = {
  createTestimony,
  updateTestimony
}


class TestimonyForm extends Component {

    constructor(props){
        super(props);

        this.state = {
           testimony: Object.assign({}, this.props.testimony)
        }
    }


    handleFormSubmit = (values)  => {
       
        //to be able to add date when submiting a form
      values.date = moment(values.date).format();

        //this will check if event.id matched the selected event to update. then update
        if(this.props.initialValues.id){
          this.props.updateTestimony(values);
          this.props.history.goBack();
        }else{

        const newTestimony = {
          ...values,
            id: cuid(),
            hostPhotoURL:'/assets/user.png',
            postedBy: 'Emmanuel'
          }
          //if it those to match with the update then create a new event
          this.props.createTestimony(newTestimony);
          this.props.history.push('/testimony');
        }
        
    }

    handleFormChange = (evt) => {
        const newTestimony = this.state.testimony;
        newTestimony[evt.target.name] = evt.target.value;
        this.setState({
          testimony:newTestimony
        })
    }



    render() {
      const { invalid, submitting, prestine } = this.props;
        return (
            <Segment>
              <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                  
                    
                    <Field type="text" name="title" component={TextInput} placeholder="Enter testimony title" /> 
                  
          
                    <Field 
                      name="date" 
                      type="text" 
                      component={DateInput} 
                      placeholder="Date and Time"
                      dateFormat="YYYY-MM-DD HH:mm"
                      timeFormat='HH:mm'
                      showTimeSelect 
                      />

              
                    <Field type="text" name="postedBy" component={TextInput}  placeholder="Posted by"/> 
                
                    <Field type="text" name="testi" component={TextArea}  placeholder="Tell us your testimony"/>
                  
                  <Button disabled={invalid || submitting || prestine}  color="red" type="submit">
                    Submit
                  </Button>
                  <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
              </Form>
            </Segment>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({ form: 'testimonyForm', enableReinitialize:true, validate })(TestimonyForm));