import React, { FormEvent, SyntheticEvent, useRef, useState } from 'react';
// utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
// types
import { Chillhop } from '../data/chillhop';

type Props = {
  currentSong: Chillhop;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

type SongInfo = {
  currentTime: number;
  duration: number;
};

const getTime = (time: number): string => {
  return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};

const Player = ({ currentSong, isPlaying, setIsPlaying }: Props) => {
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  // event handlers
  const onPlayClick = (): void => {
    if (audioRef.current == null) return;
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const onRangeDrag = (event: FormEvent<HTMLInputElement>) => {
    if (audioRef.current == null) return;

    const currentTime = Number(event.currentTarget.value);
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  };

  const onAudioLoadedAndTimeUpdated = (
    event: SyntheticEvent<HTMLAudioElement>
  ) => {
    const currentTime = event.currentTarget.currentTime;
    const duration = event.currentTarget.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={onRangeDrag}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={onPlayClick}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={onAudioLoadedAndTimeUpdated}
        onTimeUpdate={onAudioLoadedAndTimeUpdated}
      ></audio>
    </div>
  );
};

export default Player;
