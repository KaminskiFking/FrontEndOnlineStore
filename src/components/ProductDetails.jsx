import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetailsById } from '../services/api';
import { addItem, getCartItems, removeItem } from '../services/cartShopItensAPI';
import Email from './Email';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      email: '',
      text: '',
      rating: '',
      comentarios: [],
      tela: [],
      cartSum: 0,
    };
  }

  async componentDidMount() {
    this.Total();
    const { match: { params: { id } } } = this.props;
    const prod = await getDetailsById(id);
    this.setState({
      products: prod,
    });
    const getComments = JSON.parse(localStorage.getItem(`${id}`));
    this.setState({ tela: getComments });
  }

  storageProducts = (e) => {
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
      };
      addItem(storage);
    }
    this.Total();
  }

onInputChange = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value });
}

handleClickForm = (event) => {
  event.preventDefault();
  const { rating, text, email } = this.state;
  const { match: { params: { id } } } = this.props;
  console.log(id);
  const obj = {
    nota: rating,
    texto: text,
    em: email,
  };
  this.setState((prevState) => (
    { comentarios: [...prevState.comentarios, obj],
    }), () => {
    const { comentarios } = this.state;
    localStorage.setItem(`${id}`, JSON.stringify(comentarios));
    this.setState({
      emailScreen: email,
      textAreaScreen: text,
      radioScreen: rating,
      rating: '',
      text: '',
      email: '',
    });
  });
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
  const { products,
    cartSum,
    text,
    email,
    tela, radioScreen, emailScreen, textAreaScreen } = this.state;
  const { title, thumbnail, price, quantidade } = products;
  return (
    <div>
      <p data-testid="shopping-cart-size">{`Itens no carrinho: ${cartSum}`}</p>
      <p data-testid="product-detail-name">{ title }</p>
      <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
      <p data-testid="product-detail-price">{ price }</p>
      {quantidade}
      <Link to="/search" data-testid="shopping-cart-button">Ir para o Carrinho</Link>
      <button
        type="button"
        onClick={ () => this.storageProducts(products) }
        data-testid="product-detail-add-to-cart"
      >
        Adicionar Ao Carrinho
      </button>
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="product-detail-email"
            name="email"
            onChange={ this.onInputChange }
            value={ email }
            required
          />
        </label>
        Nota 1
        <input
          type="radio"
          name="rating"
          value="1"
          data-testid="1-rating"
          onChange={ this.onInputChange }
        />
        2
        <input
          type="radio"
          value="2"
          name="rating"
          data-testid="2-rating"
          onChange={ this.onInputChange }
        />
        3
        <input
          type="radio"
          value="3"
          name="rating"
          data-testid="3-rating"
          onChange={ this.onInputChange }
        />
        4
        <input
          value="4"
          type="radio"
          name="rating"
          data-testid="4-rating"
          onChange={ this.onInputChange }
        />
        5
        <input
          value="5"
          type="radio"
          data-testid="5-rating"
          name="rating"
          onChange={ this.onInputChange }
        />
        <label htmlFor="text">
          <textarea
            placeholder="deixe seu comentário"
            type="text"
            name="text"
            data-testid="product-detail-evaluation"
            onChange={ this.onInputChange }
            value={ text }
          />
        </label>
        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ this.handleClickForm }
        >
          Enviar
        </button>
      </form>
      {tela && (tela.map((element, index) => (
        <div key={ index }>
          <p data-testid="review-card-email">{element.em}</p>
          <p data-testid="review-card-rating">{element.nota}</p>
          <div data-testid="review-card-evaluation">{element.texto}</div>
        </div>)))}
      { emailScreen
            && <Email
              email={ emailScreen }
              comentarioScreen={ textAreaScreen }
              radio={ radioScreen }
            />}
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
