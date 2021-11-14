import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumInfo: [],
      musicList: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((info) => this.setState({ albumInfo: info[0], musicList: info.slice(1) }));
  }

  render() {
    const { albumInfo, musicList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {!musicList ? <Loading /> : (
          <div>
            <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
            <ul>
              {musicList.map((music) => (<MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
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
