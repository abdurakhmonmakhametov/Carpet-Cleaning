import React, { useState } from 'react';
import { CloseIcon, MenuIcon, UserIcon } from '../../assets/images';
import { UserBar } from '../';

const Navbar = ({ isOpen, sideBarHandler, isDark, darkMode }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const userSettingsHandler = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <div className="navbar h-[65px] dark:bg-dark-background bg-light-background shadow-lightShadow dark:shadow-darkShadow fixed top-0 left-0 z-[100] w-full flex justify-between px-5">
      <div className="flex items-center">
        <button
          onClick={sideBarHandler}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <p className="ml-2 text-2xl font-semibold font-bold dark:text-dark-textColor text-light-textColor font-gilroy Gilroy-Semibold">
          Dashboard
        </p>
      </div>
      <button
        onClick={userSettingsHandler}
        aria-expanded={isSettingsOpen}
        aria-label="Open User Settings"
      >
        <UserIcon />
      </button>
      {isSettingsOpen && (
        <div onClick={userSettingsHandler} className="absolute top-0 left-0 w-full h-screen bg-black opacity-30"></div>
      )}
      <UserBar
        isDark={isDark}
        darkMode={darkMode}
        closeHandler={userSettingsHandler}
        isOpen={isSettingsOpen}
      />
    </div>
  );
};

export default Navbar;
