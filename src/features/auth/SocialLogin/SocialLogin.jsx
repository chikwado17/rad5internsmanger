import React from 'react';
import {Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({ socialLogin }) => {
    return (
        <div> 
           <Button style={{ marginBottom: '10px' }} onClick={()=> socialLogin('github')} type="button" fluid color="instagram">
            <Icon name="github" />
            Login with Github
            </Button>
    
            <Button  onClick={()=> socialLogin('google')} type="button" fluid color="google plus">
            <Icon name="google plus" />
            Login with Google
            </Button>
        </div>
    )
}

export default SocialLogin;
