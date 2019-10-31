import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Item, Icon, List, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import TestimonySocialLinks from './TestimonySocialLinks';




const mapStateToProps = (state) => ({
  auth: state.firebase.auth
})




class TestimonyListItem extends Component {


    render() {
      const { testimony, auth } = this.props;
       
        return (
             <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image size="tiny" as={Link} to={`/profile/${auth.uid}`} circular src={testimony.hostPhotoURL} />
                      <Item.Content>
                        <Item.Header as={Link} to={`/testimonies/${testimony.id}`}>{testimony.title}</Item.Header>
                        <Item.Description>
                          Posted by <Link  to={`/profile/${testimony.hostUid}`}>{testimony.postedBy}</Link>
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
                    <p style={{lineHeight: '1.9', textAlign: 'justify'}}>{testimony.testi}</p>

                    <Divider horizontal><Icon name="edit" /> </Divider>
              
                  <Button as={Link} to={`/testimonies/${testimony.id}`} color="red" floated="right" content="View" />
                 
                </Segment>
              </Segment.Group>
        )
    }
}
export default connect(mapStateToProps)(TestimonyListItem);