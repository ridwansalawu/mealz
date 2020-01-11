import React from 'react'
import './LoginForm.css'


export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    onLoginClick() {
        // TODO: validate inputs
        this.props.login(this.state.email, this.state.password);
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    render() {
        return (
            <div className="background">
            <div className="container">
            <div className='login-form text-left'>
            <div className='container-position'>
            <h1 className='text-center'>Welcome to Mealpicker!</h1>
            <p className='text-center'>Hungry ? Log in to discover the best food to eat.</p>
            <div className="form-group">   
                <label htmlFor="email"><b>Email</b></label>
                <input className="form-control" type="text" placeholder="Enter Email" name="email" required
                    value={this.state.email} onChange={this.handleEmailChange}  />
                    </div> 
                    <div className="form-group"></div>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" className="form-control" placeholder="Enter Password" name="psw" required 
                    value={this.state.password} onChange={this.handlePasswordChange} />
    <div className="text-center button-holder">
                    <button className="loginBtn" className="btn btn-primary btn-lg" onClick={() => this.onLoginClick() }>Login</button>
                </div>
                </div>
                </div>
            </div>
            </div>);
    }
}