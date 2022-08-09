import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetailsById } from '../services/api';
import { addItem } from '../services/cartShopItensAPI';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const prod = await getDetailsById(id);
    this.setState({
      products: prod,
    });
  }

  storageProducts = (title, price, thumbnail) => {
    const storage = {
      title,
      price,
      thumbnail,
      quantidade: 1,
    };
    addItem(storage);
  }

  render() {
    const { products } = this.state;
    const { title, thumbnail, price, quantidade } = products;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{ price }</p>
        {quantidade}
        <Link to="/search" data-testid="shopping-cart-button">Ir para o Carrinho</Link>
        <button
          type="button"
          onClick={ () => this.storageProducts(title, price, thumbnail) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar Ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
