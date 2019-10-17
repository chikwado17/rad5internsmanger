import React from 'react';
import { Segment,Grid, Icon } from 'semantic-ui-react';

const TestimonyDetailedInfo = ({testimony}) => {
    return (
        <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{testimony.testi}</p>
            </Grid.Column>
          </Grid>
        </Segment>
       
       
      </Segment.Group>
    )
}

export default TestimonyDetailedInfo;
