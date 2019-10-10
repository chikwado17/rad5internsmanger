import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
    render() {
        const { events, onEditEvent, deleteEvent } = this.props;
        return (
            <div>
                {events && events.map((event) => (
                              /* passing events to EventListItem */        //from eventdashboard                      
                    <EventListItem key={event.id} events={event}  onEditEvent={onEditEvent}       deleteEvent={deleteEvent}/>
                ))}
            </div>
        )
    }
}

export default EventList;