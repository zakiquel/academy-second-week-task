import React, {memo, useState} from 'react';
import cls from './MainPage.module.scss'
import File from "@/shared/assets/icons/file.svg";
import {Icon} from "@/shared/ui/Icon";

const MainPage = () => {
  const [drag, setDrag] = useState(false);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
  }

  return (
    <main className={cls.MainPage}>
      <div className={cls.container}>
        {drag
          ? <div
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={e => onDropHandler(e)}
              className={cls.dragOver}
            >
              <Icon Svg={File} />
            </div>
          : <div
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              className={cls.select}
            >
              <span>Select a file </span> or drag in form
            </div>
        }
        <div className={cls.form}>
          <form action="">

          </form>
        </div>
      </div>
    </main>
  );
};

export default memo(MainPage);