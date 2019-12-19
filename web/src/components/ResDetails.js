import React from 'react'
import Axios from 'axios'
import Navigation from './Navigation'
import './ResDetails.css'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
export default class ResDetails extends React.Component{
   
   state={
       res_info:[],
       res_tags:[]
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
               console.log(this.state.res_info)
           })
           .catch(error => {   
             console.log(error);
           });

           
        let resTags = this.state.res_info.cuisines
        resTags = resTags.split(', ');
        console.log(resTags)
        this.setState({res_tags: resTags})

        let credit = this.state.res_info.highlights.filter(highlight => highlight == 'Credit card') 
        let credit2 = this.state.res_info.highlights.includes('credit card') 
           console.log(credit);
           console.log(credit2);
  

      }

    render(){
        let resImg = this.state.res_info.photos


        const credit_card = <FontAwesomeIcon icon={faCreditCard} />
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
                            {
                                
                                
                                }

                                 
                                
                            
                        </div>
                        <p>{console.log(this.state.res_info.highlights)}</p>
                        <h3>Opening Hours</h3>
                        {this.state.res_info.timings}
                    </div>
                    <div className="col-6">
                        {/* {resAdress && resAdress.map(e => <p>{e.address}</p>)} */}
                    </div>
                </div>
                
            </div>
            </React.Fragment>
        )
    }
}

