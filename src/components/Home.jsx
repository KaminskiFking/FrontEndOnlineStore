import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorie: [],
      nameText: '',
      products: [],
    };
  }

  async componentDidMount() {
    const categorie = await getCategories();
    this.setState({
      categorie,
    });
  }

  onChange = ({ target }) => {
    this.setState({
      nameText: target.value,
    });
  }

  fetchProducts = async () => {
    const { nameText } = this.state;
    const prod = await getProductsFromCategoryAndQuery(nameText);
    const { results } = prod;
    this.setState({
      products: results,
    });
  }

  render() {
    const { categorie, nameText, products } = this.state;
    console.log(products);
    return (
      <div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div>
          <label htmlFor="text">
            Produto
            <input
              data-testid="query-input"
              name="product"
              id="product"
              type="text"
              value={ nameText }
              onChange={ this.onChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.fetchProducts }
          >
            Buscar
          </button>
          <Link
            data-testid="shopping-cart-button"
            to="/search"
          >
            Carrinho

          </Link>
          {categorie.map((cat) => (
            <button
              key={ cat.id }
              data-testid="category"
              type="button"
            >
              {cat.name}
            </button>
          ))}
        </div>
        {products.length !== 0 ? (
          products.map((item, index) => (
            <div data-testid="product" key={ index }>
              <p>{item.title}</p>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{item.price}</p>
            </div>
          ))) : <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}
