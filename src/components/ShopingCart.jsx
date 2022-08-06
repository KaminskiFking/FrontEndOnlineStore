import React, { Component } from 'react';

class ShopingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const getDetailProducts = JSON.parse(localStorage.getItem('items'));
    this.setState({ products: getDetailProducts });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-product-quantity">{products.length}</p>
        {products ? products.map((element, index) => (
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">{element.nome}</p>
            <p>{element.price}</p>
          </div>
        )) : (
          <div
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </div>
        )}
      </div>
    );
  }
}

export default ShopingCart;
