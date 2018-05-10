import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ListBooks from './components/ListBooks'
import SearchBooks from "./components/SearchBooks";

class App extends Component {

    handleChange(e) {
        console.log(e)
    }
  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
              <ListBooks/>
          )}/>
          <Route path='/search' render={() => (
              <SearchBooks/>
          )}/>
      </div>
    );
  }
}

export default App;
