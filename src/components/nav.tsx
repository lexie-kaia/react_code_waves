import React from 'react';

type Props = {
  isLibraryActive: boolean;
  setIsLibraryActive: (isLibraryActive: boolean) => void;
};

const Nav = ({ isLibraryActive, setIsLibraryActive }: Props) => {
  const onClick = () => {
    setIsLibraryActive(!isLibraryActive);
  };

  return (
    <header className="nav-container">
      <h1>CodeWaves</h1>
      <button onClick={onClick}>Library</button>
    </header>
  );
};

export default Nav;
