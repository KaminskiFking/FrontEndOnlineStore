import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { addItem, getCartItems, removeItem } from '../services/cartShopItensAPI';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categorie: [],
      nameText: '',
      products: [],
      catProd: [],
      isDisabled: false,
      cartSum: 0,
    };
  }

  async componentDidMount() {
    const categorie = await getCategories();
    this.setState({
      categorie,
    });
    this.Total();
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

  storageProducts = (e) => {
    this.setState({ isDisabled: true });
    const prodList = getCartItems();
    const test = prodList.some((item) => item.title === e.title);
    if (test) {
      prodList.forEach((item2) => {
        if (item2.title === e.title) {
          removeItem(item2);
          const storage = {
            title: item2.title,
            price: item2.price,
            thumbnail: item2.thumbnail,
            quantidade: item2.quantidade + 1,
            available_quantity: item2.available_quantity,
          };
          addItem(storage);
        }
      });
    } else {
      const storage = {
        title: e.title,
        price: e.price,
        thumbnail: e.thumbnail,
        quantidade: 1,
        available_quantity: e.available_quantity,
      };
      addItem(storage);
    }
    this.Total();
    this.setState({ isDisabled: false });
  }

  Total() { // req 13
    const cartGeted = getCartItems();
    if (cartGeted) {
      let sum = 0;
      cartGeted.forEach((item) => {
        sum += item.quantidade;
        this.setState({ cartSum: sum });
      });
    }
  }

  render() {
    const { categorie, nameText, products, catProd, isDisabled, cartSum } = this.state;
    return (
      <div>
        <div data-testid="home-initial-message">
          <p data-testid="shopping-cart-size">{`Itens no carrinho: ${cartSum}`}</p>
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
              name="category"
              key={ cat.id }
              data-testid="category"
              type="button"
              onClick={ async () => {
                // const { nameText } = this.state;
                const prod = await getProductsFromCategoryAndQuery(cat.name);
                const { results } = prod;
                this.setState({
                  products: results,
                });
              } }
            >
              {cat.name}
            </button>
          ))}
        </div>
        {
          catProd.map((e2, index) => (
            <div key={ index }>
              <Link
                to={ `/productDetails/${e2.id}` }
                data-testid="product-detail-link"
              >
                <p data-testid="product">{e2.title}</p>
                {e2.shipping.free_shipping === true && (
                  <p data-testid="free-shipping">
                    Frete Grátis !
                  </p>
                ) }
                <img
                  data-testid="product"
                  src={ e2.thumbnail }
                  alt={ e2.title }
                />
                <p data-testid="product">{e2.price}</p>
              </Link>
              <button
                name="product-add-to-cart"
                data-testid="product-add-to-cart"
                type="button"
                disabled={ isDisabled }
                onClick={ () => this.storageProducts(e2) }
              >
                Adicionar Ao Carrinho
              </button>
            </div>
          ))
        }
        {products.length !== 0 ? (
          products.map((item, index) => (
            <div data-testid="product" key={ index }>
              <Link
                to={ `/productDetails/${item.id}` }
                data-testid="product-detail-link"
              >
                <p>{item.title}</p>
                {item.shipping.free_shipping === true && (
                  <p data-testid="free-shipping">
                    Frete Grátis !
                  </p>
                ) }
                <img src={ item.thumbnail } alt={ item.title } />
                <p>{item.price}</p>
              </Link>
              <button
                name="product-add-to-cart"
                data-testid="product-add-to-cart"
                type="button"
                disabled={ isDisabled }
                onClick={ () => this.storageProducts(item) }
              >
                Adicionar Ao Carrinho
              </button>
            </div>
          ))) : <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}
