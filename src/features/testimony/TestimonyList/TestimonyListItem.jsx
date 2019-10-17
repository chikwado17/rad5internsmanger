import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import TestimonySocialLinks from './TestimonySocialLinks';


class TestimonyListItem extends Component {
    render() {
      const { testimony } = this.props;
        return (
             <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" circular src={testimony.hostPhotoURL} />
                      <Item.Content>
                        <Item.Header as="a">{testimony.title}</Item.Header>
                        <Item.Description>
                          Posted by <a>{testimony.postedBy}</a>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" /> {format(testimony.date.toDate(), 'dddd Do MMMM')} at {format(testimony.date.toDate(), 'HH:mm')}
                    
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                      <TestimonySocialLinks 
                        facebook={testimony.facebookUrl} 
                        twitter={testimony.twitterUrl} 
                        git={testimony.gitUrl}
                      />
                  </List>
                </Segment>
                <Segment clearing>
                    <span>{testimony.testi}</span>


              
                  <Button as={Link} to={`/testimonys/${testimony.id}`} color="red" floated="right" content="View" />
                </Segment>
              </Segment.Group>
        )
    }
}
export default TestimonyListItem;