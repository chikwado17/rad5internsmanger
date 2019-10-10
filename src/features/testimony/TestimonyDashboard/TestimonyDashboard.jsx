import React, { Component } from 'react';
import cuid from 'cuid';
import { Grid, Button } from 'semantic-ui-react';
import TestimonyList from '../TestimonyList/TestimonyList';
import TestimonyForm from '../TestimonyForm/TestimonyForm';

const eventsData = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]


class TestimonyDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            events: eventsData,
            isOpen: false,
            selectedEvent:null
        }
    }


    

    handleFormOpen = () => {
        this.setState({
            isOpen: true,
            selectedEvent:null
        })
    }

    handleFormClose = () => {
        this.setState ({
            isOpen: false
        })
    }


    //this function will update any selected events
    handleUpdateEvent = (eventToUpdate) => {
      this.setState({
        events:this.state.events.map((event) => {
          if(event.id === eventToUpdate.id){
            //the object assign will clone and replace the event to be updated with the new one.
            return Object.assign({}, eventToUpdate)
          }else{
            //if the event to update does not match the selected event to update return back the event.
            return event
          }
        }),
        isOpen:false,
        selectedEvent:null
      })
    }


    //will be added to view button at EventListItem which is to read and updated the event
    handleOpenEvent = (eventToOpen) => () => {
        this.setState({
            selectedEvent:eventToOpen,
            isOpen:true
        });
    }


    //this method will add or will update the new event added from the form.
    handleCreateEvent = (newEvent) => {
        //generating random id
        newEvent.id = cuid();
        newEvent.hostPhotoURL = '/assets/user.png';

        //passing the old events and the new events to updatedEvents.  passed down to EventForm
        const updatedEvents = [...this.state.events, newEvent];
        this.setState({
            events: updatedEvents,
            isOpen:false
        })
    }


    //this will delete any selected event.
    handleDeleteEvent = (eventId) => () => {
      const updatedEvent = this.state.events.filter(e => e.id !== eventId);
        this.setState({
          events:updatedEvent
        })
    }


    render() {
        const { selectedEvent } = this.state;
        return (
            
            <Grid>
                <Grid.Column width={10}>
                    <TestimonyList events={this.state.events}   onEditEvent={this.handleOpenEvent}   deleteEvent={this.handleDeleteEvent} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Button onClick={this.handleFormOpen} positive content="Create Event"/>

                    {this.state.isOpen &&

                    <TestimonyForm updateEvent={this.handleUpdateEvent} handleFormClose={this.handleFormClose}   handleCreateEvent={this.handleCreateEvent}  selectedEvent={selectedEvent} />}

                </Grid.Column>
            </Grid>
        )
    }
}

export default TestimonyDashboard;