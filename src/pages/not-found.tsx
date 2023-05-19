import React, { FC, HTMLAttributes } from 'react';
import styles from './not-found.module.css';

export const NotFoundPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

  return (
    <main className={`${styles.wrapper} text text_type_main-medium text_color_inactive`}>
      Страница не найдена &#128575;
    </main>
  );
};