import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userSelected: '',
    };
  }

  componentDidMount() {
    getUser()
      .then((info) => this.setState({ userSelected: info }));
  }

  render() {
    const { userSelected } = this.state;

    return (
      <header data-testid="header-component">
        {!userSelected && <Loading />}
        {userSelected && (
          <div>
            <p data-testid="header-user-name">{userSelected.name}</p>
            <p><Link to="/search" data-testid="link-to-search">Search</Link></p>
            <p><Link to="/favorites" data-testid="link-to-favorites">Favorites</Link></p>
            <p><Link to="/profile" data-testid="link-to-profile">Profile</Link></p>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
