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
  setError: (value: string) => void;
  error: string;
}

export const JsonUpload = memo((props: JsonUploadProps) => {
  const {
    drag,
    setFiles,
    setDrag,
    setJsonData,
    files,
    setError,
    error
  } = props
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setError('');

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'json') {
        setFiles(Array.from(e.target.files));

        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            if (e.target) {
              const data = JSON.parse(e.target.result as string);
              setJsonData(data);
            }
          } catch (error) {
            setError('Error parsing JSON file');
            console.error('Error parsing JSON file', error);
          }
        };

        reader.readAsText(e.target.files[0]);
      } else {
        setError('Invalid file type. Please select a .json file.');
      }
    }
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'json') {
        setFiles(Array.from(e.dataTransfer.files));

        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            if (e.target) {
              const data = JSON.parse(e.target.result as string);
              setJsonData(data);
            }
          } catch (error) {
            setError('Error parsing JSON file');
            console.error('Error parsing JSON file', error);
          }
        };

        reader.readAsText(e.dataTransfer.files[0]);
      } else {
        setError('Invalid file type. Please select a .json file.');
      }
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

  function handleReset() {
    setFiles([]);
    setError('');
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
          accept=".json"
          type="file"
          className={cls.input}
          onChange={handleChange}
        />
        <p>or drag in form</p>
      </label>
      <p className={cls.warning}>
        {(error || files[0]) ? <span>{error}</span> : '.json files up to 10 MB in size are available for download'}
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
          <Button
            type="reset"
            className={cls.resetBtn}
            theme={ButtonTheme.CLEAR}
          >
            <span>Delete file</span>
          </Button>
        </>
      }
    </form>
  );
});
