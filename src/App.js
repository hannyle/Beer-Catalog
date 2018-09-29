import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import Beer from './components/Beers';
import Home from './components/Home';
import './App.css';


class App extends Component {
  render(){
    return(
      <div>
      <BrowserRouter>                 
          <Switch>            
            <Route path="/home" component={Home}/>
            <Redirect from="/" to="/home"/>
            <Route path={"/beer/:id"} component={Beer}/>
          </Switch>        
      </BrowserRouter>
    </div>
    );    
  }
}

export default App;
