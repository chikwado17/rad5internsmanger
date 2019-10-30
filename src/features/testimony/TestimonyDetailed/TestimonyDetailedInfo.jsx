import React from 'react';
import { Segment,Grid, Icon } from 'semantic-ui-react';

const TestimonyDetailedInfo = ({testimony}) => {
    return (
        <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="blue" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p style={{padding: '2px', margin: '10px', lineHeight: '1.9', textAlign: 'justify'}}>{testimony.testi}</p>
            </Grid.Column>
          </Grid>
        </Segment>
       
       
      </Segment.Group>
    )
}

export default TestimonyDetailedInfo;
