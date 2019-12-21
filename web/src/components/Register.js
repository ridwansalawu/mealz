import React from 'react'
// import Navegation from './Navigation'
import './Register.css'
import { Link } from '@reach/router';
import { AlertTriangle } from 'react-feather';
export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        };
    }
    // const userProps = {
    //     isLoggedIn: this.state.isLoggedIn,
    //     currentUser: this.state.currentUser,
    //     logout: () => this.handleLogout(),
    //     login: (email, pass) => this.handleLogin(email, pass)
    //   };
    onSignupClick() {
        // TODO: validate inputs
        const user = this.props.user;
        this.props.onSignup(this.state)

        
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleConfirmPasswordChange = (e) => {
        this.setState({password_confirmation: e.target.value});
    }

    render() {
        const user = this.props.user;
        return (
            <div>
    
            <div className="container">
                <h1>Sign Up</h1>

                <label htmlFor="name"><b>Name</b></label>
                <input  type="text" placeholder="Enter your Name" name="name" required
                    value={this.state.name} onChange={this.handleNameChange}  />

                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required
                    value={this.state.email} onChange={this.handleEmailChange}  />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required 
                    value={this.state.password} onChange={this.handlePasswordChange} />

                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" required
                    value={this.state.password_confirmation} onChange={this.handleConfirmPasswordChange}  />

                <div className="clearfix">
                    <button type="button" className="cancelbtn" onClick={() => this.props.onCancelClick() }>Cancel</button>
                    <button type="submit" className="signupbtn" onClick={() => this.onSignupClick() }>Sign Up</button>
                </div>
                </div>
            </div>);
    }
}