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
import Nav from './components/nav';

const App = () => {
  // state
  const [songs] = useState<Chillhop[]>(data());
  const [currentSong, setCurrentSong] = useState<Chillhop>(songs[0]);
  const [playInfo, setPlayInfo] = useState<PlayInfo>({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLibraryActive, setIsLibraryActive] = useState<boolean>(false);

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

  const selectCurrentSong = (song: Chillhop) => {
    setCurrentSong(song);
    setIsPlaying(false);
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
    const animationPercentage = Math.round((currentTime / duration) * 100);
    setPlayInfo({ ...playInfo, currentTime, duration, animationPercentage });
  };

  const skipPlay = (direction: 'skip-back' | 'skip-forward'): void => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    switch (direction) {
      case 'skip-forward':
        selectCurrentSong(songs[(currentIndex + 1) % songs.length]);
        break;
      case 'skip-back':
        selectCurrentSong(
          currentIndex - 1 < 0
            ? songs[songs.length - 1]
            : songs[currentIndex - 1]
        );
        break;
    }
  };

  const onLoadedMetaData = (event: SyntheticEvent<HTMLAudioElement>) => {
    updatePlayInfo(event.currentTarget);
    playSongPromise();
  };

  const onTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    updatePlayInfo(event.currentTarget);
  };

  const onEnded = () => {
    skipPlay('skip-forward');
  };

  return (
    <div className={`app ${isLibraryActive ? 'libraryActive' : ''}`}>
      <Nav
        isLibraryActive={isLibraryActive}
        setIsLibraryActive={setIsLibraryActive}
      />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        playInfo={playInfo}
        isPlaying={isPlaying}
        playSong={playSong}
        updateCurrentTime={updateCurrentTime}
        skipPlay={skipPlay}
      />
      <Library
        songs={songs}
        currentSong={currentSong}
        isLibraryActive={isLibraryActive}
        selectCurrentSong={selectCurrentSong}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={onLoadedMetaData}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      ></audio>
    </div>
  );
};

export default App;
