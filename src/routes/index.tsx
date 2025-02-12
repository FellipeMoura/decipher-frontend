import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../contexts';
import { Home, Game } from '../components/pages';


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {

    setDrawerOptions({
      ['Início']: {
        icon: 'home',
        options: [
          {
            icon: 'home',
            path: '/',
            label: 'Início',
          },
        ],
      },
      ['Jogar']: {
        icon: 'games_outlined',
        options: [
          {
            icon: 'games_outlined',
            path: '/jogar',
            label: 'Jogar',
          },
        ],
      },
    });
  }, []);



  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/jogar" element={<Game />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
