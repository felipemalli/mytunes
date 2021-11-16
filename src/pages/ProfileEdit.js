import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: [],
      isLoading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    getUser()
      .then((info) => this.setState({
        userInfo: info,
        redirect: false,
      }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userInfo } = this.state;
    this.setState({ isLoading: true });
    updateUser(userInfo)
      .then(() => this.setState({ isLoading: false, redirect: true }));
  }

  onInputChange = ({ target: { name, value } }) => {
    const { userInfo } = this.state;
    this.setState({
      userInfo: { ...userInfo, [name]: value },
    });
    console.log(userInfo);
  }

  isDisable = () => {
    const { userInfo } = this.state;
    if (!userInfo.email || !userInfo.name
      || !userInfo.image || !userInfo.description) return true;
    if (!(userInfo.email.includes('@'))) return true;
    if (!(userInfo.email.includes('.com'))) return true;
    console.log(userInfo);

    return false;
  }

  render() {
    const { userInfo, isLoading, redirect } = this.state;

    if (!userInfo) this.setState({ isLoading: true });

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <input
              name="name"
              placeholder="Altere seu nome"
              type="text"
              value={ userInfo.name }
              data-testid="edit-input-name"
              onChange={ this.onInputChange }
            />
            <input
              name="email"
              placeholder="Altere seu email"
              type="email"
              value={ userInfo.email }
              data-testid="edit-input-email"
              onChange={ this.onInputChange }
            />
            <input
              name="description"
              placeholder="Altere sua descrição"
              type="text"
              value={ userInfo.description }
              data-testid="edit-input-description"
              onChange={ this.onInputChange }
            />
            <input
              name="image"
              placeholder="Altere sua imagem"
              type="text"
              value={ userInfo.image }
              data-testid="edit-input-image"
              onChange={ this.onInputChange }
            />
            <button
              type="submit"
              data-testid="edit-button-save"
              onClick={ this.handleSubmit }
              disabled={ this.isDisable() }
            >
              Salvar
            </button>
          </form>
        )}
        {redirect && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
