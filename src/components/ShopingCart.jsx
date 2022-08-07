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
    const getProductsInfo = JSON.parse(localStorage.getItem('detailsInfo'));
    this.setState({ products: [getDetailProducts, getProductsInfo] });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {products[0] ? products[0].map((element, index) => (
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">{element.nome}</p>
            <p>{element.price}</p>
          </div>
        )) : null}
        {products[1] ? products[1].map((item, index) => (
          <div key={ index }>
            <p data-testid="shopping-cart-product-name">{item.title}</p>
            <p>{item.price}</p>
          </div>
        )) : null}
        {products[0] ? (
          <p
            data-testid="shopping-cart-product-quantity"
          >
            {products[0].length}
          </p>
        )
          : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
        {products[1] ? (
          <p
            data-testid="shopping-cart-product-quantity"
          >
            {products[1].length}
          </p>
        )
          : (
            <p>
              Seu carrinho está vazio
            </p>
          )}
      </div>
    );
  }
}

export default ShopingCart;
