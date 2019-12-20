import React from 'react'
import './Card.css'
import { Heart,MapPin  } from 'react-feather' 


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

    return (
        <div className="card-container">
            <div className="heart"><Heart /></div>
            <div className="card-img">
                <img className="img-fluid" src={this.props.card_img} alt=' ' />
            </div>
            <span className="card-link">
                <div className="card-img--hover">
                {/* <img src={this.props.card_img} /> */}
                </div>
                
            <div className="card-info">
                <span className="cuisine">{this.props.cuisine}</span>
                <h3 className="resturant-title">{this.props.resturant_title}</h3>
                <div className="location">
                    <div className="pin"><MapPin/></div><span className="location_name">{this.props.location_name}</span>
                </div>
            </div>
            </span>       
        </div>
    
    )}
}

export default Card;