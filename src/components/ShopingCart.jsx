import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, removeItem, addItem } from '../services/cartShopItensAPI';

class ShopingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      QUANT: 0,
    };
  }

  async componentDidMount() {
    const products = await getCartItems();
    this.setState({ products });
    this.Total();
  }

  Total = () => {
    const { products } = this.state;
    this.setState({ QUANT: 0 });
    products.forEach((item) => this
      .setState((prevState) => ({ QUANT: prevState.QUANT + item.quantidade })));
  }

  removeAllItens = (title) => {
    const prodList = getCartItems();
    prodList.forEach((item) => item.title === title && removeItem(item));
    const products = getCartItems();
    this.setState({ products });
    this.Total();
  }

  addQuant = (element) => {
    const prodList = getCartItems();
    prodList.forEach((item) => {
      if (item.title === element.title) {
        removeItem(element);
        const storage = {
          title: element.title,
          price: element.price,
          thumbnail: element.thumbnail,
          quantidade: element.quantidade + 1,
        };
        addItem(storage);
      }
    });
    const products = getCartItems();
    this.setState({ products });
    this.Total();
  }

  decreaseQuant = (element) => {
    const prodList = getCartItems();
    prodList.forEach((item) => {
      if (item.title === element.title) {
        removeItem(element);
        const storage = {
          title: element.title,
          price: element.price,
          thumbnail: element.thumbnail,
          quantidade: element.quantidade - 1,
        };
        if (storage.quantidade > 0) {
          addItem(storage);
        }
      }
    });
    const products = getCartItems();
    this.setState({ products });
    this.Total();
  }

  moveToCheckout = () => {
    const { history } = this.props;
    history.push('/search/checkout');
  }

  render() {
    const { products, QUANT } = this.state;
    return (
      <div>
        {products.length !== 0 ? (
          <p>
            {QUANT}
          </p>
        )
          : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
        {products.length !== 0 ? products.map((element, id) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">{element.title}</p>
            <p>{element.price}</p>
            <p data-testid="shopping-cart-product-quantity">{element.quantidade}</p>
            <button
              data-testid="remove-product"
              type="button"
              onClick={ () => this.removeAllItens(element.title) }
            >
              Remover
            </button>
            <button
              data-testid="product-decrease-quantity"
              type="button"
              onClick={ () => this.decreaseQuant(element) }
            >
              -
            </button>
            <button
              data-testid="product-increase-quantity"
              type="button"
              onClick={ () => this.addQuant(element) }
            >
              +
            </button>
          </div>
        )) : null}
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ this.moveToCheckout }
        >
          Finalizar compra
        </button>
      </div>
    );
  }
}

ShopingCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShopingCart;
