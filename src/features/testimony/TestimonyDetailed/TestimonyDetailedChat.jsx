import React, { Component } from 'react'
import { Segment, Header, Comment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';


class TestimonyDetailedChat extends Component {

  state = {
    showReplyForm: false,
    selectedComment: null
  }

  handleReplyForm = (id) => () => {
    this.setState({
      showReplyForm: true,
      selectedComment: id
    })
  }

  handleCloseReplyForm = () => {
    this.setState({
      selectedComment:null,
      showReplyForm:false
    })
  }

  render() {
    const { testimonyChat, addTestimonyComment, testimonyId  } = this.props;
    const { showReplyForm, selectedComment } = this.state;
    return (
      <div>
          <Segment
              textAlign="center"
              attached="top"
              inverted
              color="teal"
              style={{ border: 'none' }}
            >
              <Header>Comment on this Testimony</Header>
            </Segment>
        
              <Segment attached>
                <Comment.Group>
                  {testimonyChat && testimonyChat.map((comment) => (
                    <Comment key={comment.id}>
                      <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                        <Comment.Metadata>
                          <div>{distanceInWords(comment.date, Date.now())} ago</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.text}</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action onClick={this.handleReplyForm(comment.id)}>Reply</Comment.Action>
                          {showReplyForm && selectedComment === comment.id &&
                            <EventDetailedChatForm 
                            form={`reply_${comment.id}`} 
                            addEventComment={addTestimonyComment} 
                            eventId={testimonyId}
                            closeForm={this.handleCloseReplyForm}
                            parentId={comment.id}
                            />
                          }
                        </Comment.Actions>
                      </Comment.Content> 


                        {/* for chat reply */}
                        <Comment.Group>
                          {comment.childNodes && comment.childNodes.map((child)=> (
                            <Comment key={child.id}>
                              <Comment.Avatar src={child.photoURL || "/assets/user.png"} />
                                <Comment.Content>
                                  <Comment.Author as={Link} to={`/profile/${child.uid}`}>{child.displayName}</Comment.Author>
                                  <Comment.Metadata>
                                    <div>{distanceInWords(child.date, Date.now())} ago</div>
                                  </Comment.Metadata>
                                  <Comment.Text>{child.text}</Comment.Text>
                                  <Comment.Actions>
                                    <Comment.Action onClick={this.handleReplyForm(child.id)}>Reply</Comment.Action>
                                    {showReplyForm && selectedComment === child.id &&
                                      <EventDetailedChatForm 
                                      form={`reply_${child.id}`} 
                                      addEventComment={addTestimonyComment} 
                                      eventId={testimonyId}
                                      closeForm={this.handleCloseReplyForm}
                                      parentId={child.parentId}
                                      />
                                    }
                                  </Comment.Actions>
                                </Comment.Content>  
                                               
                              </Comment>
                          ))}
                            

                            
                        </Comment.Group>    

                                   
                    </Comment>
                  ))}
                </Comment.Group> 
                <EventDetailedChatForm parentId={0} form={`newComment`} addEventComment={addTestimonyComment} eventId={testimonyId}/>
              </Segment>
      </div>
    )
  }
}
export default TestimonyDetailedChat;
