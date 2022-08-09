import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ShopingCart from './components/ShopingCart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/search" component={ ShopingCart } />
          <Route exact path="/productDetails/:id" component={ ProductDetails } />
          <Route exact path="/search/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}
