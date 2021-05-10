import React, { useState } from 'react';
// utils
import { Chillhop, data } from './data/chillhop';
// styles
import './styles/app.scss';
// components
import Player from './components/player';
import Song from './components/song';
import Library from './components/library';

const App = () => {
  // state
  const [songs, setSongs] = useState<Chillhop[]>(data());
  const [currentSong, setcurrentSong] = useState<Chillhop>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} />
    </div>
  );
};

export default App;
