import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Grid, Header, Icon, Image, Item, List, Segment} from "semantic-ui-react";
import differenceInYears from 'date-fns/difference_in_years';
import format from 'date-fns/format';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook,faTwitter,faGithub } from "@fortawesome/free-brands-svg-icons";
import LazyLoad from 'react-lazyload';


const query = ({ auth }) => {
    return [
        {
            collection: 'users',
            doc:auth.uid,
            subcollections: [{collection: 'photos'}],
            storeAs: 'photos'  
        }
    ]
}

const mapStateToProps = (state) => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
});


class UserDetailedPage extends Component {

    render() {

        const { profile, photos} = this.props;


        let age;
        if(profile.dateOfBirth){
            age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
        }else{
            age = 'unknown age';
        }
//for createdAt
        let createdAt;
        if(profile.createdAt){
            createdAt = format(profile.createdAt.toDate(), 'dddd Do MMMM');
        }else{
            createdAt = 'unknown'
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.occupation || 'Unknown'}</Header>
                                    <br/>
                                    <Header as='h3'>{age}, {profile.city || 'Unknown'}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={8}>
                                <Header icon='smile' content='About Me'/>
                                <p>I am a: <strong> {profile.occupation || 'Unknown'}</strong></p>
                                <p>Originally from <strong> {profile.origin || 'Unknown'}</strong></p>
                                <p>Member Since: <strong>{createdAt}</strong></p>
                                <p> {profile.about || 'Unknown'}</p>

                            </Grid.Column>
                            <Grid.Column width={3}>

                                <Header icon='code' content='Skills'/> 

                                {profile.interests && profile.interests ?
                                <List>
                                    {profile.interests && profile.interests.map((skill, index) => (
                                    <Item key={index}>
                                        <Icon name='heart'/>
                                        <Item.Content>{skill}</Item.Content>
                                    </Item>))}
                                </List> : <p>No Skills</p> }
                                
                            </Grid.Column>

                            <Grid.Column width={4}>

                                <Header icon='globe' content='Social Links'/> 
                                <div className="social-container">
                                    <a href={profile.facebookUrl} target="_blank" className="facebook social">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                                    </a>
                                    <a href={profile.twitterUrl} target="_blank" className="twitter social">
                                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                                    </a>
                                    <a href={profile.gitUrl} target="_blank" className="github social">
                                        <FontAwesomeIcon icon={faGithub} size="2x" />
                                    </a>
                                </div>
                                
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
            

                <Grid.Column width={16}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                       
                          {/* displaying user photos store on firestore */}
                        <Image.Group  size='small'>
                            {photos && photos.map(photo => (
                                <LazyLoad key={photo.id} height={150} placeholder={<Image src='/assets/user.png' />}>  
                                    <Image src={photo.url} /> 
                                </LazyLoad> 
                            ))}
                        </Image.Group>
                      
                      
                    </Segment>
                </Grid.Column>

                <Grid.Column width={16}>
                    <Segment attached>
                        <Header icon='calendar' content='My Testimonies'/>
                        

                        <Card.Group itemsPerRow={5}>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                            <Card>
                                <Image src={'/assets/categoryImages/drinks.jpg'}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        Event Title
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        28th March 2018 at 10:00 PM
                                    </Card.Meta>
                                </Card.Content>
                            </Card>

                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(auth => query((auth)))
)(UserDetailedPage);