import React from 'react';

type Props = {
  isLibraryOpen: boolean;
  setIsLibraryOpen: (isLibraryOpen: boolean) => void;
};

const Nav = ({ isLibraryOpen, setIsLibraryOpen }: Props) => {
  const onClick = () => {
    setIsLibraryOpen(!isLibraryOpen);
  };

  return (
    <header className="nav-container">
      <h1>CodeWaves</h1>
      <button onClick={onClick}>Library</button>
    </header>
  );
};

export default Nav;
