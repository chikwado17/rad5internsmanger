import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class TestmonyActivity extends Component {
  renderSummary = activity => {
    switch (activity.type) {
      case 'newTestimony':
        return (
          <div>
            New By! {' '}
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.postedBy}
            </Feed.User>{' '}
            Posted {' '}
            <Link to={{ pathname: '/testimonies/' + activity.testimonyId }}>
              {activity.title}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>
              {distanceInWordsToNow(activity.timestamp.toDate())} ago
            </Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default TestmonyActivity;
