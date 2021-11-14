import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      artistNameSaved: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onClickButton = () => {
    const { artistName } = this.state;
    this.setState({ isLoading: true },
      () => searchAlbumsAPI((artistName))
        .then((info) => this.setState(
          {
            albumList: info,
            isLoading: false,
            artistNameSaved: artistName,
          },
        )));
  }

  isButtonClicked = () => {

  }

  render() {
    const {
      artistName,
      isLoading,
      albumList,
      artistNameSaved,
    } = this.state;

    const REQUIRED_CHARACTERS = 2;
    const canLogin = artistName.length < REQUIRED_CHARACTERS;
    const artistAndNoAlbum = (artistName && albumList.length === 0);

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          {isLoading ? <Loading /> : (
            <div>
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
            </div>
          )}
          <div>
            <p>
              {albumList.length !== 0 && `Resultado de álbuns de: ${artistNameSaved}`}
              {artistAndNoAlbum && 'Nenhum álbum foi encontrado'}
            </p>
            <ul>
              {albumList.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <span>{album.collectionName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
