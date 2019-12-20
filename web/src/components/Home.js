import React from 'react'
import Spinner from './components/Spinner'
import Axios from 'axios'
import _ from 'lodash'
// import { Link } from 'react-feather';



class Home extends React.Component {
    constructor() {
        super();
        this.places = ['Thai', 'Italian', 'Japanese', 'Brazillian', 'Mexican', 'Fastfood', 'Chinese', 'Pizza', 'Healthy'];
        this.state = {
        favCuisines: [],
        hour: null
      }
      }
      componentDidMount(){
        const url_key = 'ce01c524c280392f934d5bb8228b2277'
        Axios({
           method: "GET",
           url: `https://developers.zomato.com/api/v2.1/cuisines?city_id=260`,
           headers: {
             "user-key": url_key,
             "content-type": "application/json"
           }
         })
           .then(response => {
               const cuisineName = response.data.cuisines;
               this.setState({favCuisines: cuisineName})
              //  console.log(this.state.favCuisines)
           })
           .catch(error => {   
             console.log(error);
           });

           this.getHour()

      }
      
      getHour = () => {
        const date = new Date();
        const hour = date.getHours()
        this.setState({
           hour
        });
       }

      render(props) {
        const sample = _.sampleSize(this.state.favCuisines, 15)
        // console.log(sample)
        const getName = sample.map((e) => {
          
            return {name: e.cuisine.cuisine_name, id: e.cuisine.cuisine_id}
        });
        // console.log(getName)
        return (
            <div className="App">
              <h1>What should I eat for 
              {this.state.hour < 10 ? ` breakfast` : (this.state.hour > 10 && this.state.hour < 14 ? (this.state.hour > 14 ? ` dinner`(` lunch`):` lunch`) :null)} ?
              </h1>
              <Spinner items={getName} />
            
            </div>
            
          );

      }
}

export default Home;