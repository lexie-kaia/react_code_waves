import React, { useState, useRef, SyntheticEvent } from 'react';
// types
import { Chillhop, PlayInfo } from './types/types';
// utils
import { data } from './data/chillhop';
// styles
import './styles/app.scss';
// components
import Player from './components/player';
import Song from './components/song';
import Library from './components/library';

const App = () => {
  // state
  const [songs, setSongs] = useState<Chillhop[]>(data());
  const [currentSong, setCurrentSong] = useState<Chillhop>(songs[0]);
  const [playInfo, setPlayInfo] = useState<PlayInfo>({
    currentTime: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoadead, setIsLoaded] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playSong = () => {
    if (audioRef.current == null) return;

    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const playSongPromise = () => {
    if (audioRef.current == null) return;
    const promise = audioRef.current.play();

    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const updateCurrentTime = (currentTime: number) => {
    if (audioRef.current == null) return;
    audioRef.current.currentTime = currentTime;
    setPlayInfo({ ...playInfo, currentTime });
  };

  const updatePlayInfo = (audioElement: HTMLAudioElement) => {
    const currentTime = Number.isNaN(audioElement.currentTime)
      ? 0
      : audioElement.currentTime;
    const duration = Number.isNaN(audioElement.duration)
      ? 0
      : audioElement.duration;
    setPlayInfo({ ...playInfo, currentTime, duration });
  };

  // event handler

  const onLoadedMetaData = (event: SyntheticEvent<HTMLAudioElement>) => {
    updatePlayInfo(event.currentTarget);
    setIsLoaded(true);
    playSongPromise();
  };

  const onTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    updatePlayInfo(event.currentTarget);
  };

  const onLibraryItemClick = (song: Chillhop) => {
    setCurrentSong(song);
    setIsLoaded(false);
    setIsPlaying(false);
  };

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        playSong={playSong}
        updateCurrentTime={updateCurrentTime}
        isPlaying={isPlaying}
        playInfo={playInfo}
      />
      <Library songs={songs} onLibraryItemClick={onLibraryItemClick} />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={onLoadedMetaData}
        onTimeUpdate={onTimeUpdate}
      ></audio>
    </div>
  );
};

export default App;
