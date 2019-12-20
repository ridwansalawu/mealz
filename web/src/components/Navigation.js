import React from 'react';
import {Link} from '@reach/router';
import './Navigation.css'

class Navigation extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home"><img className="logo" alt="logo" src="../logo.svg"></img></Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link menu-text" to="/search/">Search</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link menu-text" to="/searchlocation/">Search by Location</Link>
              </li>
              
              <li className="nav-item">
              <Link className="nav-link menu-text" to="/">Logout</Link>
              </li>
            </ul>
            </nav>

        )
    }
}

export default Navigation