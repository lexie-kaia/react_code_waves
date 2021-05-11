import React from 'react';
// types
import { Chillhop } from '../types/types';

type Props = {
  song: Chillhop;
  onLibraryItemClick: (song: Chillhop) => void;
};

const LibrarySong = ({ song, onLibraryItemClick }: Props) => {
  const onClick = () => {
    onLibraryItemClick(song);
  };

  return (
    <li
      className={`library-item ${song.active ? 'selected' : ''}`}
      onClick={onClick}
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
