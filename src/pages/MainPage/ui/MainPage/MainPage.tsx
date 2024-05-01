import React, {ChangeEvent, memo, useState} from 'react';
import cls from './MainPage.module.scss'
import FileIcon from "@/shared/assets/icons/file.svg";
import {Input} from "@/shared/ui/Input";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Icon} from "@/shared/ui/Icon";
import {Button, ButtonTheme} from "@/shared/ui/Button";

const MainPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonData, setJsonData] = useState(null);
  const [drag, setDrag] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
      console.log(e.target.files[0])
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (e.target) {
          const data = JSON.parse(e.target.result as string);
          setJsonData(data);
        }
      } catch (error) {
        console.error('Error parsing JSON file', error);
      }
    };

    if (e.target.files) {
      reader.readAsText(e.target.files[0]);
    }

    console.log(jsonData)
  }


  function handleDrag(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function handleLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  }

  function handleReset() {
    setFiles([]);
  }

  return (
    <main className={cls.MainPage}>
      <div className={cls.container}>
        <form
          className={classNames(cls.form, {[cls.drag]: drag})}
          onDragEnter={e => handleDrag(e)}
          onDragOver={e => handleDrag(e)}
          onDragLeave={e => handleLeave(e)}
          onDrop={e => handleDrop(e)}
          onReset={handleReset}
        >
          <label className={cls.label}>
            <span className={cls.labelSpan}>Select a file</span>
            <Input
              type="file"
              className={cls.input}
              onChange={handleChange}
            />
            <p>or drag in form</p>
          </label>
          <p className={cls.warning}>
            .json files up to 10 MB in size are available for download
          </p>
          <Icon Svg={FileIcon} className={cls.icon} />
          {files.length > 0 &&
            <>
              <ul className={cls.fileList}>
                {files.map(({name}, id) =>
                  <li className={cls.file} key={id}>
                    {name}
                  </li>)
                }
              </ul>
              <div className={cls.btns}>
                <Button
                  type="reset"
                  className={cls.resetBtn}
                  theme={ButtonTheme.OUTLINE}
                >
                  Reset
                </Button>
              </div>
            </>
          }
        </form>
        <div>
          <form action="">

          </form>
        </div>
      </div>
    </main>
  );
};

export default memo(MainPage);