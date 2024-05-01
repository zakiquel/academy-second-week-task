import React, {ChangeEvent, memo} from 'react';
import cls from './JsonUpload.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {Input} from "@/shared/ui/Input";
import {Icon} from "@/shared/ui/Icon";
import FileIcon from "@/shared/assets/icons/file.svg";
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {Data} from "../../model/types/data";

interface JsonUploadProps {
  drag: boolean;
  setFiles: (files: File[]) => void;
  setJsonData: (data: Data) => void;
  setDrag: (value: boolean) => void;
  files: File[];
}

export const JsonUpload = memo((props: JsonUploadProps) => {
  const {
    drag,
    setFiles,
    setDrag,
    setJsonData,
    files,
  } = props
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
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
      <Icon
        Svg={FileIcon}
        className={cls.icon}
      />
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
  );
});
