import React, { useState } from 'react';
// utils
import { Chillhop, data } from './data/chillhop';
// styles
import './styles/app.scss';
// components
import Player from './components/player';
import Song from './components/song';

const App = () => {
  // state
  const [songs, setSongs] = useState<Chillhop[]>(data());
  const [currentSong, setcurrentSong] = useState<Chillhop>(songs[0]);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player />
    </div>
  );
};

export default App;
