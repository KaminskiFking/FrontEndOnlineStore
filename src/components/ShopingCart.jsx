import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, removeItem, addItem } from '../services/cartShopItensAPI';

class ShopingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const products = await getCartItems();
    this.setState({ products });
  }

  removeAllItens = (title) => {
    const prodList = getCartItems();
    prodList.forEach((item) => item.title === title && removeItem(item));
    const products = getCartItems();
    this.setState({ products });
  }

  addQuant = (element) => {
    const prodList = getCartItems();
    prodList.forEach((item) => {
      if (item.title === element.title && item.quantidade < item.available_quantity) {
        removeItem(element);
        const storage = {
          title: element.title,
          price: element.price,
          thumbnail: element.thumbnail,
          quantidade: element.quantidade + 1,
          available_quantity: element.available_quantity,
        };
        addItem(storage);
      }
    });
    const products = getCartItems();
    this.setState({ products });
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
          available_quantity: element.available_quantity,
        };
        if (storage.quantidade > 0) {
          addItem(storage);
        }
      }
    });
    const products = getCartItems();
    this.setState({ products });
  }

  moveToCheckout = () => {
    const { history } = this.props;
    history.push('/search/checkout');
  }

  // .sort((a, b) => ((a.title > b.title) ? 1 : sn))

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) }
        {products.length !== 0 ? products
          .map((element, id) => (
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
