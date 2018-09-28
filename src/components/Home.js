import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      originalBeers: [],
      beers: [],
      inputSearch: '',
      filterValue: '',
      itemsToShow: 9,
      expanded: false    
    }
  }
  fetchBeer = () => {
    fetch('https://api.punkapi.com/v2/beers')
    .then(res => res.json())
    .then(resData => {
      if(this.props.location.state !== undefined){
        let searchBeer = resData;
        searchBeer = searchBeer.filter(beer =>{         
          return beer.name.toLowerCase().search(this.props.location.state.storeValue.toLowerCase()) !== -1;        
        });
        this.setState({
          originalBeers: resData, 
          beers: searchBeer, 
          inputSearch: this.props.location.state.storeValue
        });
      }
      else{
        let arr = []
        for(let i = 0; i<resData.length; i++){
          arr.push(resData[i]);
        }
        this.setState({
          originalBeers: resData,
          beers: arr
        });
      }
    })
  }

  componentDidMount = () => {
    this.fetchBeer();        
  }
  
  handleSearch = (e) => {       
    this.setState({inputSearch: e.target.value}); 
    let inputLen = e.target.value.length;
    let searchBeer = this.state.beers;
    if(inputLen > 0){
      searchBeer = searchBeer.filter(beer =>{         
        return beer.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;        
      });
      this.setState({beers: searchBeer});
    }
    else{      
      this.setState({beers: [...this.state.originalBeers]});      
    }       
  }       
  
  sortBy= () =>{
    this.setState({beers: [...this.state.originalBeers]});
  }

  alphabetSort = () => {
    this.state.beers.sort((a,b)=>(a.name.localeCompare(b.name)));
  }

  latestToOld = () => {        
    this.state.beers.sort((a, b) => {     
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
    this.state.beers.sort((a, b) => {     
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

  handleSort = (e) => {
    this.setState({filterValue: e.target.value});
    const text = "some errors";
    switch (e.target.value){          
      case "alphabet":
        this.alphabetSort();
        break;
      case "latest":
        this.latestToOld();
        break;
      case "oldest":
        this.OldestToLate();
        break;
      case "choose":
        this.sortBy();
        break;
      default:
        return text;
    }    
  }

  handleNavigate = (id) => {        
      this.props.history.push({
        pathname: "/beer/" + id,
        state: {searchValue : this.state.inputSearch}
      });   
  }

  showMore = () => {
    this.state.itemsToShow === 9 ? 
      (this.setState({itemsToShow: this.state.beers.length, expanded: true})) : (this.setState({itemsToShow: 9, expanded: false}))
  }

  render() {
    const beerList = this.state.beers.slice(0, this.state.itemsToShow).map(beer => (      
      <div className="col-sm-3 beer" key={beer.id} onClick={()=>{this.handleNavigate(beer.id)}}>         
        <img src={beer.image_url} alt="beer_image"/> 
        <h5>{beer.name}</h5>                        
        <p className="text">{beer.tageline}</p>
        <p className="text">{beer.first_brewed}</p>
      </div>
    ));   
    return (
      <div>
        <header>
          <input type="text" id="myInput" onChange={this.handleSearch} value={this.state.inputSearch} placeholder="Search"/>
          <select value={this.state.filterValue} onChange={this.handleSort}>
            <option value="choose">Sort by</option>
            <option value="alphabet">Alphabet</option>
            <option value="latest">Latest production date</option>
            <option value="oldest">Oldest production date</option>
          </select>
        </header>
        <div className="container-fluid">                 
            <div className="row">
                {beerList}                
            </div>
            <a className="show-more" onClick={this.showMore}>
              {this.state.expanded ? (<span>Show less</span>) : (<span>Show more</span>)}
            </a>        
        </div>         
      </div>
    );
  }
}

export default Home;