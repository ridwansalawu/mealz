import React from 'react';
import './App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './components/SearchResult'
import { Router,Link } from '@reach/router'
import ResDetails from './components/ResDetails'
import Navigation from './components/Navigation'
import CuisineInfo from './components/CuisineInfo'
import Login from './components/Login'
import SearchLocation from './components/SearchLocation';

function App() {
  const Homepg =() =>(
    <div>
      <Navigation/>
      <div className="container">
      <Home/>
      </div>
      
    </div>
  )

  const Search =()=>(
    <div>
      <Navigation/>
      <div className="container">
      <SearchResults />
      </div>
        
    </div>
  )

  return (
        <div className="App">
          <Router>
            <Login path="/" />
            <Homepg path="/home" />
            <Search path="/search/"/>
            <ResDetails path='/restaurant/:id'/>
            <CuisineInfo path='/cuisine/:id' />
            <SearchLocation path="/searchlocation/" />
          </Router>
           
        </div>
  );
}

export default App;

















// import React from 'react';

// import './App.css';

// class App extends React.Component {
//   state = {
//       conferences: []
//   };

//   componentDidMount() {
//       fetch('/api/conferences')
//           .then(response => response.json())
//           .then(json => {
//              this.setState({conferences: json})
//           });
//   }

//   render() {
//       const conferenceElements = this.state.conferences.map((conf) => <li>{conf.name}, {conf.city}</li>);
//       return (
//           <div className="App">
//               <header className="App-header">Upcoming developer conferences in 2020</header>
//               <ul>{conferenceElements}</ul>
//           </div>
//       );
//   }
// }

// export default App;








