import React from 'react';
// types
import { Chillhop } from '../types/types';
// components
import LibrarySong from './library_song';

type Props = {
  songs: Chillhop[];
  currentSong: Chillhop;
  isLibraryActive: boolean;
  selectCurrentSong: (sont: Chillhop) => void;
};

const Library = ({
  songs,
  currentSong,
  isLibraryActive,
  selectCurrentSong,
}: Props) => (
  <div className={`library-container ${isLibraryActive ? 'active' : ''}`}>
    <h2 className="library-title">Library</h2>
    <ul className="library-list">
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          currentSong={currentSong}
          selectCurrentSong={selectCurrentSong}
        />
      ))}
    </ul>
  </div>
);

export default Library;
