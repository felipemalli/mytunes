import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      isLoading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClickButton = () => {
    const { inputName } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    createUser({ name: inputName }).then(() => history.push('/search'));
  }

  render() {
    const {
      inputName,
      isLoading,
    } = this.state;

    const REQUIRED_CHARACTERS = 3;
    const canLogin = inputName.length < REQUIRED_CHARACTERS;

    return (
      <div data-testid="page-login">
        <input
          name="inputName"
          placeholder="Nome"
          type="text"
          data-testid="login-name-input"
          onChange={ this.onInputChange }
        />

        <button
          type="submit"
          disabled={ canLogin }
          data-testid="login-submit-button"
          onClick={ this.onClickButton }
        >
          Entrar
        </button>
        {isLoading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
