import React from 'react';
import LoginForm from '../components/LoginForm';
import { navigate } from '@reach/router';

export default class LoginPage extends React.Component {

    
    handleLoginClick(email, password) {
        this.props.user.login(email, password);
        navigate('/home')
    }

    render() {
        
        return (
            <>
                <LoginForm login={(email, pass)=>this.handleLoginClick(email, pass)}></LoginForm>
            </>
        )
    }
}