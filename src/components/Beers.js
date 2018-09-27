import React, { Component } from 'react';
import createHistory from "history/createBrowserHistory";

class Beer extends React.Component {
  constructor(props){
    super(props);
    this.state = {thisBeer: []}
  }
    navigateHome = () =>{        
        this.props.history.push("/home");
    }

    componentDidMount = () => {
      
      fetch('https://api.punkapi.com/v2/beers/' +  this.props.match.params.id)
      .then(res => res.json())
      .then(resData => {
        this.setState({
          thisBeer: resData[0]
        });  
      })
      
    }
  render() {    
    return (
      <div>        
        <button onClick={this.navigateHome} className="btn btn-primary">Go Back</button>
        <div className="this-beer">
          <h5>{this.state.thisBeer.name}</h5>
          <img className="beer-img" src={this.state.thisBeer.image_url} alt="beer_image"/>
          <div className="beer-desc">
            <p className="text">{this.state.thisBeer.tageline}</p>
            <p className="text"><strong>First produced:</strong> {this.state.thisBeer.first_brewed}</p>
            <p className="text"><strong>Description:</strong> {this.state.thisBeer.description}</p>
            <p className="text"><strong>ABV:</strong> {this.state.thisBeer.abv}</p>
            <p className="text"><strong>Matching food:</strong> {this.state.thisBeer.food_pairing}</p>
          </div>         
        </div>
      </div>
    )
  }
}

export default Beer;