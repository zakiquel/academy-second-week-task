import React, { memo } from 'react';
import cls from './MainPage.module.scss'

const MainPage = () => {
  return (
    <main
      className={cls.MainPage}
    >
      <h1>Main Page</h1>
    </main>
  );
};

export default memo(MainPage);