import React, { Component } from 'react';
import TestimonyListItem from './TestimonyListItem';
import InfiniteScroll from 'react-infinite-scroller';

class TestimonyList extends Component {
    render() {
        const { testimonies, getNextTestimony, loading, moreTestimonies } = this.props;
        return (
            <div>
            {testimonies && testimonies.length !== 0 && 
                <InfiniteScroll
                    pageStart={0}
                    loadMore={getNextTestimony}
                    hasMore={!loading && moreTestimonies}
                    initialLoad={false}
                >

                {testimonies && testimonies.map((testimony) => (
                              /* passing events to EventListItem */        //from eventdashboard                      
                    <TestimonyListItem key={testimony.id} testimony={testimony} />
                ))}
                </InfiniteScroll> 
            }
            </div>
        )
    }
}

export default TestimonyList;