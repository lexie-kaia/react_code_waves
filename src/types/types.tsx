export type Chillhop = {
  name: string;
  id: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  active: boolean;
};

export type PlayInfo = {
  currentTime: number;
  duration: number;
  animationPercentage: number;
  volume: number;
};
