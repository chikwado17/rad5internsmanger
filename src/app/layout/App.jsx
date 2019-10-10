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
              <Container className="main">
                <Switch>
                    <Route path="/testimony" component={TestimonyDashboard}/>
                    <Route path="/testimony/:id" component={TestimonyDetailedPage}/>
                    <Route path="/profile/:id" component={UserDetailedPage}/>
                    <Route path="/settings" component={SettingsDashboard}/>
                    <Route path="/createTestimony" component={TestimonyForm}/>
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