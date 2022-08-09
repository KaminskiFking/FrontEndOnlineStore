import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Email extends Component {
  constructor() {
    super();
    this.state = {
      returnEmail: false,
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailValidar = this.validar(email);
    this.setState({
      returnEmail: emailValidar,
    });
  }

  validar = (email) => {
    if (/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
      return true;
    }
  }

  render() {
    const { email, comentarioScreen, radio } = this.props;
    const { returnEmail } = this.state;
    return (
      returnEmail ? (
        <div>
          <p>{email}</p>
          <p>{comentarioScreen}</p>
          <p>{radio}</p>
        </div>
      ) : <p data-testid="error-msg">Campos inválidos</p>
    );
  }
}

Email.propTypes = {
  radio: PropTypes.string.isRequired,
  comentarioScreen: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
