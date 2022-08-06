import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShopingCart extends Component {
  render() {
    const { nameProduct, quantifyProduct } = this.props;
    return (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
        <p data-testid="shopping-cart-product-name">{nameProduct}</p>
        <p data-testid="shopping-cart-product-quantity">{quantifyProduct}</p>
      </div>
    );
  }
}

ShopingCart.propTypes = {
  nameProduct: PropTypes.string.isRequired,
  quantifyProduct: PropTypes.string.isRequired,
};

export default ShopingCart;
