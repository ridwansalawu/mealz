import React from 'react';
import Axios from 'axios';
import Card from './Card'




class searchLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            location: "",
            longitude: "",
            latitude: "",
            street_number: "",
            street_name: "",
            suburb: "",
            region: "",
            formatted_address: "",
            myLocLong: "",
            myLocLat: "",
            resolvedLoc: "",
            resolvedSuburb: "",
            entity_id: "",
            entity_type: "",
            searchResult: "",
            restaurant_name: [],
            restaurant_location: [],
            restaurant_photo: [],
            cuisines_available: [],
            selected_category: "Takeaway",
            searchResults: []
          }
            
        
        this.googleApi = "AIzaSyAnhc0QVawRAJP9z0c07bkJCp8wyoai_gk"
        this.handleChangeStreetNo = this.handleChangeStreetNo.bind(this);
        this.handleChangeStreetName = this.handleChangeStreetName.bind(this);
        this.handleChangeSuburb = this.handleChangeSuburb.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
        
       

    }

    handleChangeStreetNo(e) {
        this.setState({street_number: e.target.value})
    }
    handleChangeStreetName(e) {
        this.setState({street_name: e.target.value})
    }
    handleChangeSuburb(e) {
        this.setState({suburb: e.target.value})
    }
    handleChangeState(e) {
        this.setState({region: e.target.value})
    }

    drawMap() {
        let mapDiv = document.createElement("div");
        let mapSrc = "https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x300&maptype=roadmap&markers=${this.state.address}&key=AIzaSyAnhc0QVawRAJP9z0c07bkJCp8wyoai_gk"; 
    }







handleSubmit(e) {

  const address = `${ this.state.street_number }${this.state.street_name.replace(/\s/g,"+")},+${this.state.suburb.replace(/\s+/g, '+')},+${this.state.region.replace(/\s+/g, '+')}+Australia`;
  Axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleApi}`)
       .then(response => {
           const locationData = response.data;
           const longitude = locationData.results[0].geometry.location.lng;
           const latitude = locationData.results[0].geometry.location.lat;
           const formatted_address = locationData.results[0].formatted_address;
           this.setState({longitude: longitude})
           this.setState({latitude: latitude})
           this.setState({formatted_address: formatted_address})

       }).then(async response => {

       const data = await Axios({
          method:"GET",
          url: `https://developers.zomato.com/api/v2.1/locations?query=${this.state.region}&lat=${this.state.latitude}&lon=${this.state.longitude}`,
          headers: {
            "user-key": "ac7e711aadc63ab23f578cab5c3051d4",
            "content-type": "application/json"
          }
        })
        return data;
      })
      .then(response => {
        const entity_id = response.data.location_suggestions[0].entity_id;
        const entity_type = response.data.location_suggestions[0].entity_type;

        this.setState({entity_id:entity_id})
        this.setState({entity_type:entity_type})
        console.log(entity_id);
        console.log(entity_type);
       }).then(async response => {
          const data = await Axios({
                        method:"GET",
                        url: `https://developers.zomato.com/api/v2.1/search?entity_id=${this.state.entity_id}&entity_type=${this.state.entity_type}&count=5`,
                        headers: {
                          "user-key": "ac7e711aadc63ab23f578cab5c3051d4",
                          "content-type": "application/json"
                        }
                      })
          return data;
         
       }).then(response => {
         const searchResult = response.data.restaurants;
         console.log("searchResult", searchResult)
         this.setState({searchResults: searchResult})

        

                searchResult.forEach(item => {
                  console.log(item);
                  const restaurant_name = item.restaurant.name;
                  const restaurant_location = item.restaurant.location.address;
                  const restaurant_photo = item.restaurant.photos[0].photo.url ? item.restaurant.photos[0].photo.url : "https://b.zmtcdn.com/data/reviews_photos/947/0d02c61e2f22f4b2859535d712286947_1525861858.jpg";
                  console.log(restaurant_location);
                  this.setState({restaurant_name: [...this.state.restaurant_name, restaurant_name]})
                  this.setState({restaurant_location: [...this.state.restaurant_location, restaurant_location]})
                  this.setState({restaurant_photo: [...this.state.restaurant_photo, restaurant_photo]})
                
                })


       })
      
  console.log(`${this.state.latitude},${this.state.longitude}`);


 



  e.preventDefault()

}




    

    







    
    render() {
        return (

            <div className="main-container">
            <h1>address</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Street no </label>
              <input
                type="text"
                name="street_no"
                onChange={this.handleChangeStreetNo}
              />

              <label>Street Name </label>
              <input
                type="text"
                name="street_name"
                onChange={this.handleChangeStreetName}
              />

              <label>Suburb/City</label>
              <input
                type="text"
                name="suburb"
                onChange={this.handleChangeSuburb}
              />

              <label>State</label>
              <input 
                type="text" 
                name="state" 
                onChange={this.handleChangeState} 
              />

              <input type="submit" value="Submit" />

              <br />

              

              {/* <div
                style={{
                  color: "red",
                  height: "100px",
                  width: "500px",
                  border: "red solid 5px"
                }}
              >
                <h4>
                  longitude: {this.state.longitude} <br /> latitude:
                  {this.state.latitude} <br />
                  {this.state.formatted_address}
                </h4>
              </div> */}
            </form>

            <div style={{
                  color: "red",
                  height: "500px",
                  width: "500px",
                  border: "red solid 5px"
                }}>
                  {/* <img src="https://maps.googleapis.com/maps/api/staticmap?center=276Chisholm+road,Auburn+nsw&zoom=13&size=300x300&maptype=roadmap&markers=276Chisholm+road,Auburn+nsw&key=AIzaSyAnhc0QVawRAJP9z0c07bkJCp8wyoai_gk" alt="map description"/> */}
              </div>


              <div>

                {this.state.searchResults.map(result => (
                 
                  <div>
                  <Card resturant_title={result.restaurant_name}/>
                    <div>Restaurant name</div>
                    <div>{result.restaurant.name}</div>
                    <div>Cuisine</div>
                    <div>{result.restaurant.location.address}</div>
                    {result.restaurant.photos.map(photo => (
                      <img src={photo.photo.url} height="200px" width="200px" alt="restaurant"/>
                    ))}
                  </div>
                ))}



              </div>




                
            </div>
        )
    }
}



export default searchLocation;
