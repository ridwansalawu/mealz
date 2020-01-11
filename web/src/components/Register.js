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
    onSignupClick() {
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
            <div className="background">
            <div className="container">
            <div className='login-form text-left'><div className="container-position">
                <h1 className='text-center'>Sign Up</h1>
                <div className="form-group">
                <label htmlFor="name"><b>Name</b></label>
                <input className="form-control" type="text" placeholder="Enter your Name" name="name" required
                    value={this.state.name} onChange={this.handleNameChange}  />
</div>
<div className="form-group">
                <label htmlFor="email"><b>Email</b></label>
                <input className="form-control" type="text" placeholder="Enter Email" name="email" required
                    value={this.state.email} onChange={this.handleEmailChange}  />
</div><div className="form-group">
                <label htmlFor="psw"><b>Password</b></label>
                <input className="form-control" type="password" placeholder="Enter Password" name="psw" required 
                    value={this.state.password} onChange={this.handlePasswordChange} />
</div><div className="form-group">
                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                <input className="form-control" type="password" placeholder="Repeat Password" name="psw-repeat" required
                    value={this.state.password_confirmation} onChange={this.handleConfirmPasswordChange}  />
</div>
                <div className="text-center button-holder">
                <button type="submit" className="signupbtn btn btn-primary btn-lg" onClick={() => this.onSignupClick() }>Sign Up</button>
                    <button type="button" className="cancelbtn btn btn-primary btn-lg" onClick={() => this.props.onCancelClick() }>Cancel</button>
                </div></div>
                </div>
                </div>
            </div>);
    }
}