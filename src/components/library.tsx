import React from 'react';
// types
import { Chillhop } from '../data/chillhop';
// components
import LibrarySong from './library_song';

type Props = {
  songs: Chillhop[];
};

const Library = ({ songs }: Props) => (
  <div className="library-container">
    <h2 className="library-title">Library</h2>
    <ul className="library-list">
      {songs.map((song) => (
        <LibrarySong key={song.id} song={song} />
      ))}
    </ul>
  </div>
);

export default Library;
