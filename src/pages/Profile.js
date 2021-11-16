import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: [],
    };
  }

  componentDidMount() {
    getUser()
      .then((info) => this.setState({
        userInfo: info,
      }));
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {!userInfo ? <Loading /> : (
          <div>
            <h3>Nome</h3>
            <p>{userInfo.name}</p>
            <h3>E-mail</h3>
            <p>{userInfo.email}</p>
            <h3>Descrição</h3>
            <p>{userInfo.description}</p>
            <img
              src={ userInfo.image }
              alt="Imagem de perfil"
              data-testid="profile-image"
            />
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
