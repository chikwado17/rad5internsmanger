import React from 'react';
import { Segment, Item, Button, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};


const TestimonyDetailedHeader = ( { testimony } ) => {
    return (
       
   <Segment.Group>
   <Segment basic attached="top" style={{ padding: '0' }}>
   <Image style={eventImageStyle} src="/assets/categoryImages/drinks.jpg" fluid />

     <Segment basic style={eventImageTextStyle}>
       <Item.Group>
         <Item>
           <Item.Content>
             <Header
               size="huge"
               content={testimony.title}
               style={{ color: 'white' }}
             />
             <p>{testimony.date}</p>
             <p>
               Hosted by <strong>{testimony.postedBy}</strong>
             </p>
           </Item.Content>
         </Item>
       </Item.Group>
     </Segment>
   </Segment>

   <Segment attached="bottom">
    
     <Button as={Link} to={`/manage/${testimony.id}`} color="red">
       Manage Event
     </Button>
   </Segment>
 </Segment.Group>
    )
}

export default TestimonyDetailedHeader;
