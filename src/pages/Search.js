import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isLoading: false,
      albumList: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClickButton = () => {
    const { artistName } = this.state;
    this.setState({ isLoading: true, albumList: searchAlbumsAPI((artistName)) });
  }

  render() {
    const {
      artistName,
      isLoading,
      albumList,
    } = this.state;

    const REQUIRED_CHARACTERS = 2;
    const canLogin = artistName.length < REQUIRED_CHARACTERS;

    return (
      <div data-testid="page-search">
        <Header />
        <input
          name="artistName"
          placeholder="Nome do Artista"
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
        />

        <button
          type="submit"
          disabled={ canLogin }
          data-testid="search-artist-button"
          onClick={ this.onClickButton }
        >
          Pesquisar
        </button>
        <p>
          Resultado de álbuns de:
          {' '}
          {artistName}
        </p>
        <p>{albumList}</p>
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default Search;
