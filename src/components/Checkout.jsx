import React from 'react';
import PropTypes from 'prop-types';
import { getCartItems } from '../services/cartShopItensAPI';

class Checkout extends React.Component {
  state = {
    products: [],
    fullName: '',
    email: '',
    cpf: '',
    cep: '',
    endereco: '',
    pagamento: false,
    invalidMessage: false,
  }

  async componentDidMount() {
    const products = await getCartItems();
    this.setState({ products });
  }

  handleChange = ({ target }) => {
    const { value, name, checked } = target;
    const key = target.type === 'radio' ? 'pagamento' : name;
    const newValue = target.type === 'radio' ? checked : value;
    this.setState({
      [key]: newValue,
    });
  }

  checkForm = (event) => {
    event.preventDefault();
    const {
      fullName,
      email,
      cpf,
      telefone,
      cep,
      endereco,
      pagamento,
    } = this.state;
    const validateOne = fullName.length === 0 || email.length === 0 || cpf.length === 0;
    const validateTwo = cep.length === 0
      || endereco.length === 0 || telefone.length === 0;
    const validate = validateOne || validateTwo || !pagamento;
    if (!validate) {
      const { history } = this.props;
      localStorage.setItem('detailProduts', JSON.stringify([]));
      history.push('/');
    }
    this.setState({ invalidMessage: true });
  }

  render() {
    const {
      products,
      fullName,
      email,
      cpf,
      telefone,
      cep,
      endereco,
      invalidMessage,
    } = this.state;
    return (
      <div>
        {products.map((product, index) => (
          <p key={ index }>{ product.title }</p>
        ))}
        {invalidMessage
          && <p data-testid="error-msg">Campos inválidos</p>}
        <form action="">
          <label htmlFor="fullName">
            Nome completo:
            <input
              data-testid="checkout-fullname"
              name="fullName"
              id="fullName"
              type="text"
              value={ fullName }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="checkout-email"
              name="email"
              id="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              name="cpf"
              id="cpf"
              type="text"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="telefone">
            Telefone:
            <input
              data-testid="checkout-phone"
              name="telefone"
              id="telefone"
              type="text"
              value={ telefone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              data-testid="checkout-cep"
              name="cep"
              id="cep"
              type="text"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="endereco">
            Endereço:
            <input
              data-testid="checkout-address"
              name="endereco"
              id="endereco"
              type="text"
              value={ endereco }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="boleto">
            Boleto:
            <input
              data-testid="ticket-payment"
              name="pagamento"
              type="radio"
              id="boleto"
              value="boleto"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visa">
            Visa:
            <input
              data-testid="visa-payment"
              name="pagamento"
              type="radio"
              id="visa"
              onChange={ this.handleChange }
              value="visa"
            />
          </label>
          <label htmlFor="master-card">
            Master Card:
            <input
              data-testid="master-payment"
              name="pagamento"
              type="radio"
              id="master-card"
              onChange={ this.handleChange }
              value="master-card"
            />
          </label>
          <label htmlFor="Elo">
            Elo:
            <input
              data-testid="elo-payment"
              name="pagamento"
              type="radio"
              id="Elo"
              onChange={ this.handleChange }
              value="Elo"
            />
          </label>
          <button
            data-testid="checkout-btn"
            type="submit"
            onClick={ this.checkForm }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
