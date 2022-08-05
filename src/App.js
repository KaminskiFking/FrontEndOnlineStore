import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShopingCart from './components/ShopingCart';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/search" component={ ShopingCart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
