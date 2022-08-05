import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorie: [],
    };
  }

  async componentDidMount() {
    const categorie = await getCategories();
    this.setState({
      categorie,
    });
  }

  render() {
    const { categorie } = this.state;
    return (
      <div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </div>
        <div>
          {console.log(categorie)}
        </div>
        <div>
          <label htmlFor="text">
            Produto
            <input
              name="iproduct"
              id="product"
              type="text"
            // value={ inputName }
            // onChange={ this.onInputChange }
            />
          </label>
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
              { cat.name }
            </button>
          ))}
        </div>
      </div>
    );
  }
}
