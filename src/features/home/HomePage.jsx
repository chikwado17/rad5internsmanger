import React from 'react';
import { Segment, Container, Button, Image, Header, Icon } from 'semantic-ui-react';



const HomePage = (props) => {
    return (
        <div>
            <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                <center>
                <Image
                      size='massive'
                      src='/assets/logo.png'
                      alt='logo'
                      style={{ marginBottom: 12, width:'300px' }}
                    />
                </center>
                  <Header as='h1' inverted style={{fontWeight:'700'}}>
                    INTERNS MANAGER
                  </Header>
                  <Button onClick={() => props.history.push("/testimony")} size='huge' inverted>
                    Get started
                    <Icon name='right arrow' inverted />
                  </Button>
                </Container>
              </Segment>
        </div>
    )
}

export default HomePage;
