import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import TestimonyDashboard from '../../features/testimony/TestimonyDashboard/TestimonyDashboard';
import TestimonyDetailedPage from '../../features/testimony/TestimonyDetailed/TestimonyDetailedPage';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import TestimonyForm from '../../features/testimony/TestimonyForm/TestimonyForm';
import NavBar from '../../features/nav/NavBar/NavBar';
import NotFoundPage from '../layout/NotFoundPage';
import ModalManager from '../../features/modals/ModalManager';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
        </Switch> 
        {/* Conditional rendering navbar */}
        <Route 
          path="/(.+)" 
          render={() => (
          <div> 
         
              <NavBar/>
              <ModalManager/>
              <Container className="main">
                <Switch>
                    <Route path="/testimony" exact={true} component={TestimonyDashboard}/>
                    <Route path="/testimonies/:id" component={UserIsAuthenticated(TestimonyDetailedPage)}/>
                    <Route path="/manage/:id" component={UserIsAuthenticated(TestimonyForm)}/>
                    <Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)}/>
                    <Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)}/>
                    <Route path="/createTestimony" component={UserIsAuthenticated(TestimonyForm)}/>
                    <Route component={NotFoundPage}/>
                </Switch> 
              </Container>
          </div>
        )}
        />
      </div> 
    );
  }
}

export default App;