import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';


const mapStateToProps = (state) => ({

    user: state.firebase.profile
});


const SettingsDashboard = ({ user }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
               <Switch>
                   <Redirect exact from="/settings" to="/settings/basics" />
                   <Route path="/settings/basics" render={() => <BasicPage  initialValues={user} />} />
                   <Route path="/settings/about" render={() => <AboutPage  initialValues={user} />} />
                   <Route path="/settings/photos" component={PhotosPage} />
                   <Route path="/settings/account" component={AccountPage} />
               </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingsNav/>
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapStateToProps)(SettingsDashboard);
