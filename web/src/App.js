import React from 'react';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './components/SearchResult'
import { Router, navigate, Redirect } from '@reach/router'
import ResDetails from './components/ResDetails'
import Navigation from './components/Navigation'
import CuisineInfo from './components/CuisineInfo'
import SearchLocation from './components/SearchLocation';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { SERVER_URL } from './config';
import axios from 'axios';
export default class App extends React.Component {
  
  
  constructor(props) {
		super(props);
		let auth = JSON.parse(sessionStorage.getItem('auth'));
		this.state = {
			isLoggedIn: !!auth ? true : false,
			currentUser: null,
		}
	}

	componentDidMount() {
		this.getUser();
	}

	getUser() {
		let auth = JSON.parse(sessionStorage.getItem('auth'));
		if(!auth) return;

		axios.get(`${SERVER_URL}/api/users/${auth.userId}`,{ 
			headers: {"Authorization" : `Bearer ${auth.token}`} 
		}).then(response => {
			this.setState({
				currentUser: response.data, 
				isLoggedIn: true
			});
			console.log(response.data)

			// now that login has occured, navigate to the home page
			navigate('/home');

		});
	}

	handleLogin(email, password) {
		axios.post(`${SERVER_URL}/api/auth/get_token`, {
			email: email,
			password: password
		}).then(response => {
			sessionStorage.setItem('auth', JSON.stringify(response.data));
			this.getUser();
		}).catch(err => {
			// todo some error
		});
	}

	handleLogout = () => {
		sessionStorage.setItem('auth', null);
		this.setState({currentUser: null, isLoggedIn: false});
		navigate('/');
	}

  render(){
 
  const userProps = {
    isLoggedIn: this.state.isLoggedIn,
    currentUser: this.state.currentUser,
    logout: () => this.handleLogout(),
    login: (email, pass) => this.handleLogin(email, pass)
  };
  return (

        <div className="App">
        <Navigation user={userProps} />
          <Router>
            <RegisterPage path="/signUp" user={userProps}/>
            <LoginPage path="/" user={userProps}/>
            <Home path="/home" user={userProps}/>
            <SearchResults path="/search/" user={userProps}/>
            <ResDetails path='/restaurant/:id' user={userProps}/>
            <CuisineInfo path='/cuisine/:id' user={userProps}/>
            <SearchLocation path="/searchlocation/" user={userProps} />
            
          </Router>
           
        </div>
  );
  }
}

