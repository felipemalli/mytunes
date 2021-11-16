import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumInfo: [],
      musicList: [],
      favSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((info) => this.setState({
        albumInfo: info[0],
        musicList: info.slice(1),
      }))
      .then(() => this.updateFavSongs());
  }

  saveOrRemoveSong = ({ target }) => {
    const { musicList } = this.state;
    this.setState({ isLoading: true });
    if (target.checked) {
      addSong(musicList.find((music) => music.trackId === Number(target.id)))
        .then(() => this.updateFavSongs());
    }
    if (!target.checked) {
      removeSong(musicList.find((music) => music.trackId === Number(target.id)))
        .then(() => this.updateFavSongs());
    }
  }

  updateFavSongs = () => {
    this.setState({ isLoading: true });
    getFavoriteSongs().then((info) => this.setState({
      favSongs: info,
      isLoading: false,
    }));
  }

  render() {
    const { albumInfo, musicList, isLoading, favSongs } = this.state;

    if (!musicList) this.setState({ isLoading: true });

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
            <ul>
              {musicList.map((music) => (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ this.saveOrRemoveSong } // Verifica no saveOrRemoveSong se target.checked do Music.Card.js é true/false. Se for true, verifica qual é o target.id (da música com checkbox alterado) que é igual ao id da lista de música. Isso é feito com o find, aí adiciona ela. Após adicionar, é necessário atualizar o state favSongs para que o isChecked abaixo atualize o checkbox logo em seguida. O mesmo acontece para remover a música.
                isChecked={ favSongs.some((song) => song.trackId === music.trackId) } // SE a música estiver no favSongs, o checkbox INICIAL é true! Se não, é false. O favSongs é atualizado inicialmente na função updateFavSongs que é chamada no componentDidMount. Atualiza o isChecked para true/false dependendo do que acontece no onChange (pois ele altera o favSongs).
              />))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
