import React from 'react';
// types
import { Chillhop } from '../data/chillhop';

type Props = {
  currentSong: Chillhop;
};

const Song = ({ currentSong }: Props) => (
  <div className="song-container">
    <img src={currentSong.cover} alt="" />
    <h3 className="song-name">{currentSong.name}</h3>
    <h4 className="song-artist">{currentSong.artist}</h4>
  </div>
);

export default Song;
