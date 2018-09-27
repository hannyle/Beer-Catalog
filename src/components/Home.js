import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Beer from './Beers';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          originalBeers: [],
          beers: [],
          inputSearch: '',
          filterValue: ''     
        }
      }
      fetchBeer = () => {
        fetch('https://api.punkapi.com/v2/beers')
        .then(res => res.json())
        .then(resData => {     
          this.setState({
            originalBeers: resData,
            beers: resData
          })
        })
      }

      componentDidMount = () => {
        this.fetchBeer();          
      }
    
      handleSearch = (e) => {
        this.setState({inputSearch: e.target.value}); 
        let inputLen = e.target.value.length;
        let searchBeer = this.state.originalBeers;
        if(inputLen > 0){
          searchBeer = searchBeer.filter(beer =>{         
            return beer.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;        
          });
          this.setState({beers: searchBeer});
        }else{      
          this.setState({beers: this.state.originalBeers});      
        }
      }
    
      chooseFilter = () => {
        const beer = this.state.beers.map(beer => beer);
        return beer;
      }
    
      alphabetFilter = () => {
        const alphaBeer = this.state.beers;
        alphaBeer.sort((a,b)=>(a.name.localeCompare(b.name)));    
      }
    
      latestToOld = () => {
        const latestBeer = this.state.beers;
        latestBeer.sort((a, b) => {     
          let yearA = parseInt(a.first_brewed.slice(3),10);
          let yearB = parseInt(b.first_brewed.slice(3), 10);
          if(yearA !== yearB){
            return yearB - yearA;
          }else {
            let monthA = parseInt(a.first_brewed.slice(0,2),10);
            let monthB = parseInt(b.first_brewed.slice(0,2), 10);
            return monthB - monthA;
          }
        });
      }
    
      OldestToLate = () =>{
        const latestBeer = this.state.beers;
        latestBeer.sort((a, b) => {     
          let yearA = parseInt(a.first_brewed.slice(3),10);
          let yearB = parseInt(b.first_brewed.slice(3), 10);
          if(yearA !== yearB){
            return yearA - yearB;
          }else {
            let monthA = parseInt(a.first_brewed.slice(0,2),10);
            let monthB = parseInt(b.first_brewed.slice(0,2), 10);
            return monthA - monthB;
          }
        });
      }

      noFilter= () =>{
           this.fetchBeer();
      }
    
      handleFilter = (e) => {
        this.setState({filterValue: e.target.value});
        switch (e.target.value){
          case "alphabet":
            this.alphabetFilter();
            break;
          case "latest":
            this.latestToOld();
            break;
          case "oldest":
           this.OldestToLate();
           break;
          case "choose":
           this.noFilter();
        }    
      }

      handleNavigate = (id) => {        
          this.props.history.push("/beer/" + id);        
      }
    
      render() {
        const beerList = this.state.beers.map(beer => (      
            <div className="col-sm-3 beer" key={beer.id} onClick={()=>{this.handleNavigate(beer.id)}}>         
              <img src={beer.image_url} alt="beer_image"/> 
              <h5>{beer.name}</h5>                        
              <p className="text">{beer.tageline}</p>
              <p className="text">{beer.first_brewed}</p>
            </div>
        ));   
        return (
          <div className="App">
            <header>
              <input type="text" id="myInput" onChange={this.handleSearch} value={this.state.inputSearch} placeholder="Search"/>
              <select value={this.state.filterValue} onChange={this.handleFilter}>
                <option value="choose">Filter by</option>
                <option value="alphabet">Alphabet</option>
                <option value="latest">Latest production date</option>
                <option value="oldest">Oldest production date</option>
              </select>
            </header>
            <div className="container-fluid">                 
                <div className="row">
                    {beerList}                
                </div>        
            </div>         
          </div>
        );
      }
}

export default Home;