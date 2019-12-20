import React from 'react'
import Axios from 'axios'
import Navigation from './Navigation'
import './ResDetails.css'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard,faUtensils,faChild } from '@fortawesome/free-solid-svg-icons'
import GoogleMapReact from 'google-map-react'
import { MapPin } from 'react-feather' 
import Marker from './Marker'

export default class ResDetails extends React.Component{

   state={
       res_info:[],
       res_tags:[],
       address: '',
       center: {
            lat: 0,
            lng: 0
       },
       zoom: 18,
       showCreditCard:false,
       showTakeaway: false,
       showKid:false
   }
    async componentDidMount(){
        const url_key = 'ce01c524c280392f934d5bb8228b2277'
        await Axios({
           method: "GET",
           url: `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.id}`,
           headers: {
             "user-key": url_key,
             "content-type": "application/json"
           }
         })
           .then(response => {
               const resInformation = response.data;
               this.setState({res_info: resInformation})
           })
           .catch(error => {   
             console.log(error);
           });

           
        let resTags = this.state.res_info.cuisines
        resTags = resTags.split(', ');
        console.log(resTags)
        this.setState({res_tags: resTags})
        
        let address = this.state.res_info.location.address
        this.setState({address: address})
        let lat = parseFloat(this.state.res_info.location.latitude)
        let lng = parseFloat(this.state.res_info.location.longitude)
        this.setState({center: { lat:lat, lng:lng}})

        this.displayHighlight();
        }

        displayHighlight() {

            if(this.state.res_info.highlights.includes('Credit Card') )  {
                this.setState({showCreditCard:true});
            }
            if(this.state.res_info.highlights.includes('Takeaway Available')) {
                this.setState({showTakeaway: true});
            }
            if(this.state.res_info.highlights.includes('Kid Friendly')) {
                this.setState({showKid:true});
            }
        }
    render() {
        let resImg = this.state.res_info.photos
        
        return(
            
            <React.Fragment>
            <Navigation />
            <div className="container-fluid gal-holder no-gutters p-0">
                <div className="row no-gutters">
                <div className="col-lg-6 col-md-9 col-sm-12"><img className="img-fluid featured-img" src={this.state.res_info.featured_image} /></div>
                <div className="col-3 no-gutters">
                    {resImg && resImg.slice(0,2).map(photo => (
                    <>
                    <div className="col-12"><img className="img-fluid small-img" src={photo.photo.url} /></div>
                    </>
                    ))}
                </div>
                <div className="col-3 no-gutters">
                    {resImg && resImg.slice(2,4).map(photo => (
                    <>
                    <div className="col-12"><img className="img-fluid small-img" src={photo.photo.url} /></div>
                    </>
                    ))}
                </div>
                </div>
            </div>
            <div className="container res-details">
                <div className="row">
                    <div className="col-6 text-left">
                        {
                            this.state.res_tags.map(tag => (
                                <span className="badge badge-dark">{tag}</span>
                            ))
                        }
                        <h1 className="res-name">{this.state.res_info.name}</h1>
                        <div className="highlight">
                            
                                {this.state.showCreditCard? <div className="highlight-item col-4 text-center"><FontAwesomeIcon icon={faCreditCard} size="2x" /><p>Accept Credit card</p></div>:""}
                                {this.state.showTakeaway? <div className="highlight-item col-4 text-center"><FontAwesomeIcon icon={faUtensils} size="2x" /><p>Takeaway available</p></div>:""}
                                {this.state.showKid? <div className="highlight-item col-4 text-center"><FontAwesomeIcon icon={faChild} size="2x" /><p>Kid Friendly </p></div>:""}

                        </div>
                      
                        <h3>Opening Hours</h3>
                        {this.state.res_info.timings}
                    </div>
                    <div className="col-6 text-left">
                        <p className="address"><span className="pin"><MapPin /></span>{this.state.address}</p>
                       
                        <div className="map-holder" style={{ height: '450px', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyCSiEcD8DEt-tw_ubWXsZFDkIei5gGpbCM' }}
                            center={this.state.center}
                            zoom={this.state.zoom}
                            text={this.state.res_info.name} 
                        >
                        <Marker
                            lat={this.state.center.lat}
                            lng={this.state.center.lng}
                            name={this.state.res_info.name}
                            color="#FFD000"
                        />
                        </GoogleMapReact>
                     
                        </div>

                    </div>
                </div>
                
            </div>
            </React.Fragment>
        )
    }
    
}


