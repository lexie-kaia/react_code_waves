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
import { Chillhop, PlayInfo } from '../types/types';

type Props = {
  currentSong: Chillhop;
  playInfo: PlayInfo;
  isPlaying: boolean;
  playSong: () => void;
  updateCurrentTime: (currentTime: number) => void;
  skipPlay: (direction: 'skip-back' | 'skip-forward') => void;
};

const Player = ({
  currentSong,
  playInfo,
  isPlaying,
  playSong,
  updateCurrentTime,
  skipPlay,
}: Props) => {
  const getTime = (time: number): string => {
    const minutes = `${Math.floor(time / 60)}`;
    const seconds = `0${Math.floor(time % 60)}`.slice(-2);
    return `${minutes}:${seconds}`;
  };

  const onPlayClick = (): void => {
    playSong();
  };

  const onTimeRangeDrag = (event: FormEvent<HTMLInputElement>): void => {
    const currentTime = Number(event.currentTarget.value);
    updateCurrentTime(currentTime);
  };

  const onSkipBackClick = () => {
    skipPlay('skip-back');
  };

  const onSkipForwardClick = () => {
    skipPlay('skip-forward');
  };

  const trackBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  const trackAnim = {
    transform: `translateX(${playInfo.animationPercentage}%)`,
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(playInfo.currentTime)}</p>
        <div className="input-container" style={trackBackground}>
          <input
            type="range"
            min={0}
            max={playInfo.duration}
            value={playInfo.currentTime}
            onChange={onTimeRangeDrag}
          />
          <div className="input-track" style={trackAnim}></div>
        </div>
        <p>{getTime(playInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={onSkipBackClick}
        />
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
          onClick={onSkipForwardClick}
        />
      </div>
    </div>
  );
};

export default Player;
