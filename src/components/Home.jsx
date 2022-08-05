import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
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
            Album

          </Link>
        </div>
      </div>
    );
  }
}
