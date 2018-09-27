import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Beer from './components/Beers';
import Home from './components/Home';
import './App.css';

class App extends React.Component {
  render(){
    return(
      <div className="App">
      <BrowserRouter>
       
         
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path={"/beer/:id"} component={Beer}/>
          </Switch>
        
      </BrowserRouter>
    </div>
    );    
  }
}

export default App;
