import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.updateFavSongs();
  }

  removeSong = ({ target }) => {
    const { favSongs } = this.state;
    this.setState({ isLoading: true });
    if (!target.checked) {
      removeSong(favSongs.find((music) => music.trackId === Number(target.id)))
        .then(() => this.updateFavSongs());
    }
  }

  updateFavSongs = () => {
    this.setState({ isLoading: true });
    getFavoriteSongs().then((info) => this.setState({
      favSongs: info.filter((eachInfo) => eachInfo.trackId !== undefined),
      isLoading: false,
    }));
  }

  render() {
    const { isLoading, favSongs } = this.state;

    return (
      <div>
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <ul>
              {favSongs.map((music) => (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ this.removeSong }
                isChecked
              />))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
