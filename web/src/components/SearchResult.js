import React from 'react'
import Card from './Card'
import Axios from 'axios'
import { Link } from '@reach/router'
import './SearchResult.css'
export default class SearchResult extends React.Component{
    state = {
        cityData: [],
        searchInput: " ",
    }

  searchHandler = (event) => {
 
    const value = event.target.value;
    this.setState(state => ({...state, searchInput: value}));
  }
    
  handleChange= () => {
        const url_key = 'c5ff9358cc3104a45cd8df377b24b5a3'
         Axios({
            method: "GET",
            url: `https://developers.zomato.com/api/v2.1/search?entity_id=260&entity_type=city&q=${this.state.searchInput}`,
            headers: {
              "user-key": url_key,
              "content-type": "application/json"
            }
          })
            .then(response => {
                const cityData = response.data.restaurants;
                this.setState({cityData})
                console.log(cityData)
            })
            .catch(error => {   
              console.log(error);
            });
    }
    
    render(){

        const dataAPI = this.state.cityData
        const getResp = dataAPI.map(e => {
            return e.restaurant
        })
        const getName = getResp.map((j)=>  <div className="col-4" key={j.id}>
        <Link class="card-link" to={'/restaurant/'+ j.id}><Card  resturant_title={j.name} cuisine={j.cuisines} location_name={j.location.address}
         card_img={j.featured_image} /></Link>
        </div> )
        return(
        <div className="container search-results">
            <div class="row">
            <input type='text' className="form-control form-control-lg col-6 offset-2" placeholder="What do you like to eat?" onChange={this.searchHandler}></input>
            <button className="btn btn-primary btn-lg col-1" onClick={this.handleChange}>Search</button>
            </div>
            <br/>
            <div>
            <div className="row">
            <h1>Sushi places in Sydney</h1>
            </div>
            <div className="row">
                {getName}
             </div>    
            </div>
        </div>
        )
    }
}