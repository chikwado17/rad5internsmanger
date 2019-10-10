import React, { Component } from 'react';
import { Segment, Form , Button } from 'semantic-ui-react';




const emptyEvent = {
  title:'',
  date: '',
  city:'',
  venue:'',
  hostedBy:''

}



class TestimonyForm extends Component {

    constructor(props){
        super(props);

        this.state = {
           event: emptyEvent
        }
    }


    //this renders immediately when is page is loaded
    // this will show the data of a selected event
    componentDidMount() {
      if(this.props.selectedEvent !== null){
        this.setState({
          event:this.props.selectedEvent
        })
      }
    }


    //this renderes after the page has been rendered
    //checking if the new selected event is not equal to the selected event or if the event is empty.
    componentWillReceiveProps(nextProps) {
      if(nextProps.selectedEvent !== this.props.selectedEvent){
        this.setState({
          event: nextProps.selectedEvent || emptyEvent
        })
      }
    }









    handleFormSubmit = (evt)  => {
        evt.preventDefault();
        
        //this will check if event.id matched the selected event to update. then update
        if(this.state.event.id){
          this.props.updateEvent(this.state.event);
        }else{

          //if it those to match with the update then create a new event
          this.props.handleCreateEvent(this.state.event);
        }
        
    }

    handleFormChange = (evt) => {
        const newEvents = this.state.event;
        newEvents[evt.target.name] = evt.target.value;
        this.setState({
            event:newEvents
        })
    }



    render() {
        const { handleFormClose } = this.props;
        return (
            <Segment>
              <Form onSubmit={this.handleFormSubmit}>
                  <Form.Field>
                    <label>Event Title</label>
                    <input name="title" onChange={this.handleFormChange} value={this.state.event.title} placeholder="First Name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Event Date</label>
                    <input name="date" onChange={this.handleFormChange} value={this.state.event.date} type="date" placeholder="Event Date" />
                  </Form.Field>
                  <Form.Field>
                    <label>City</label>
                    <input name="city" onChange={this.handleFormChange} value={this.state.event.city} placeholder="City event is taking place" />
                  </Form.Field>
                  <Form.Field>
                    <label>Venue</label>
                    <input name="venue" onChange={this.handleFormChange} value={this.state.event.venue} placeholder="Enter the Venue of the event" />
                  </Form.Field>
                  <Form.Field>
                    <label>Hosted By</label>
                    <input name="hostedBy" onChange={this.handleFormChange} value={this.state.event.hostedBy} placeholder="Enter the name of person hosting" />
                  </Form.Field>
                  <Button positive type="submit">
                    Submit
                  </Button>
                  <Button onClick={handleFormClose} type="button">Cancel</Button>
              </Form>
            </Segment>
        )
    }
}

export default TestimonyForm;