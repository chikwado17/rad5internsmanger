import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter} from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';


const mapDispatchToProps = {
  openModal
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})


class NavBar extends Component {


  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

    render() {
      const { auth, profile } = this.props;
      const authenticated = auth.isLoaded && !auth.isEmpty;
        return (
          <Menu inverted fixed="top">
            <Container>
              <Menu.Item as={Link} to="/" header>
                <img src="/assets/logo.png" style={{width:'50px'}} alt="logo" />
                Interns Manager
              </Menu.Item>
              
              <Menu.Item as={NavLink} to="/testimony" name="Testimonies" />

              
              {authenticated &&
              <Menu.Item>
                <Button 
                floated="right" 
                as={Link} 
                to="/createTestimony" 
                color="red"
            
                content="Add Testimony" />


              </Menu.Item>}
              {authenticated ? (

                <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut}/> 

                 ):( 

                <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister}/>
                )}
            </Container>
          </Menu>
        )
    }
}

export default withRouter(withFirebase(connect(mapStateToProps, mapDispatchToProps)(NavBar)));