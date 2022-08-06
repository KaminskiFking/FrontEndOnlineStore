import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetailsById } from '../services/api';

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

  render() {
    const { products } = this.state;
    const { title, thumbnail, price } = products;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{ price }</p>
        <Link to="/search" data-testid="shopping-cart-button">Voltar Ao Carrinho</Link>
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
