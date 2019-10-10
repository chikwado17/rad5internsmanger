import React, { Component } from 'react';
import TestimonyListItem from './TestimonyListItem';

class TestimonyList extends Component {
    render() {
        const { events, onEditEvent, deleteEvent } = this.props;
        return (
            <div>
                {events && events.map((event) => (
                              /* passing events to EventListItem */        //from eventdashboard                      
                    <TestimonyListItem key={event.id} events={event}  onEditEvent={onEditEvent}       deleteEvent={deleteEvent}/>
                ))}
            </div>
        )
    }
}

export default TestimonyList;