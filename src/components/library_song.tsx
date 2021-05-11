import React from 'react';
// types
import { Chillhop } from '../types/types';

type Props = {
  song: Chillhop;
  currentSong: Chillhop;
  selectCurrentSong: (song: Chillhop) => void;
};

const LibrarySong = ({ song, currentSong, selectCurrentSong }: Props) => {
  const onLibrarySongClick = () => {
    selectCurrentSong(song);
  };

  return (
    <li
      className={`library-item ${song.id === currentSong.id ? 'selected' : ''}`}
      onClick={onLibrarySongClick}
    >
      <img src={song.cover} alt="" />
      <div className="item-description">
        <h4 className="item-name">{song.name}</h4>
        <h5 className="item-artist">{song.artist}</h5>
      </div>
    </li>
  );
};

export default LibrarySong;
