import React from 'react';
// types
import { Chillhop } from '../types/types';
// components
import LibrarySong from './library_song';

type Props = {
  songs: Chillhop[];
  onLibraryItemClick: (sont: Chillhop) => void;
};

const Library = ({ songs, onLibraryItemClick }: Props) => (
  <div className="library-container">
    <h2 className="library-title">Library</h2>
    <ul className="library-list">
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          onLibraryItemClick={onLibraryItemClick}
        />
      ))}
    </ul>
  </div>
);

export default Library;
