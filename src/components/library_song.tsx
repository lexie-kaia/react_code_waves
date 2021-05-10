import React from 'react';
// types
import { Chillhop } from '../data/chillhop';

type Props = {
  song: Chillhop;
};

const LibrarySong = ({ song }: Props) => (
  <li className="library-item">
    <img src={song.cover} alt="" />
    <div className="item-description">
      <h4 className="item-name">{song.name}</h4>
      <h5 className="item-artist">{song.artist}</h5>
    </div>
  </li>
);

export default LibrarySong;
