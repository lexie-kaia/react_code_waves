import React, { FormEvent, useState, useRef } from 'react';
// utils
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
// types
import { PlayInfo } from '../types/types';

type Props = {
  playSong: () => void;
  updateCurrentTime: (currentTime: number) => void;
  isPlaying: boolean;
  playInfo: PlayInfo;
};

const Player = ({
  playSong,
  updateCurrentTime,
  isPlaying,
  playInfo,
}: Props) => {
  const getTime = (time: number): string => {
    const minutes = `${Math.floor(time / 60)}`;
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  // event handlers
  const onPlayClick = (): void => {
    playSong();
  };

  const onTimeRangeDrag = (event: FormEvent<HTMLInputElement>) => {
    const currentTime = Number(event.currentTarget.value);
    updateCurrentTime(currentTime);
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(playInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={playInfo.duration}
          value={playInfo.currentTime}
          onChange={onTimeRangeDrag}
        />
        <p>{getTime(playInfo.duration)}</p>
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
    </div>
  );
};

export default Player;
