import React, { Component } from 'react';
import TestimonyListItem from './TestimonyListItem';

class TestimonyList extends Component {
    render() {
        const { testimonies, onEditTestimony, deleteTestimony } = this.props;
        return (
            <div>
                {testimonies && testimonies.map((testimony) => (
                              /* passing events to EventListItem */        //from eventdashboard                      
                    <TestimonyListItem key={testimony.id} testimony={testimony}  onEditTestimony={onEditTestimony} deleteTestimony={deleteTestimony}/>
                ))}
            </div>
        )
    }
}

export default TestimonyList;