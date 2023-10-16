import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorageState('theme', {
    defaultValue: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'night'
      : 'autumn',
  });

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'autumn' : 'night');
  };

  const [checked, setChecked] = useState(true);
  useEffect(() => {
    setChecked(theme === 'night');
  }, [theme]);

  const handleClick = () => {
    toggleTheme();
    setChecked(!checked);
  };

  useEffect(() => {
    const body = document.body;
    body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="form-control">
      <label className="py-0 cursor-pointer label">
        <span className="mr-2 label-text">
          <FontAwesomeIcon icon={faSun} />
        </span>
        <input
          type="checkbox"
          className="toggle toggle-sm"
          checked={checked}
          onChange={handleClick}
        />
        <span className="ml-2 label-text">
          <FontAwesomeIcon icon={faMoon} />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
