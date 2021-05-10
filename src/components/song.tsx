import React from 'react';
// types
import { Chillhop } from '../data/chillhop';

type Props = {
  currentSong: Chillhop;
};

const Song = ({ currentSong }: Props) => (
  <div className="song-container">
    <img src={currentSong.cover} alt="" />
    <h2>{currentSong.name}</h2>
    <h3>{currentSong.artist}</h3>
  </div>
);

export default Song;
