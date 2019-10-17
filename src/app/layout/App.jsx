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
                    <Route path="/testimony" component={TestimonyDashboard}/>
                    <Route path="/testimonys/:id" component={TestimonyDetailedPage}/>
                    <Route path="/manage/:id" component={TestimonyForm}/>
                    <Route path="/profile/:id" component={UserDetailedPage}/>
                    <Route path="/settings" component={SettingsDashboard}/>
                    <Route path="/createTestimony" component={TestimonyForm}/>
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