import React, { ChangeEvent, memo, useState } from 'react';

import { Data } from "../../model/types/data";

import FileIcon from "@/shared/assets/icons/file.svg";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import { Input } from "@/shared/ui/Input";

import cls from './FileUpload.module.scss';



interface FileUploadProps {
  setJsonData?: (data: Data) => void;
  multiply?: boolean;
  max?: boolean;
  jsonOnly?: boolean;
  limit: number;
}

export const FileUpload = memo((props: FileUploadProps) => {
  const {
    setJsonData,
    multiply,
    max,
    jsonOnly,
    limit
  } = props;

  const [drag, setDrag] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');

    if (jsonOnly && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'json') {
        setFiles([e.target.files[0]]);

        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            if (e.target) {
              const data = JSON.parse(e.target.result as string);
              setJsonData?.(data);
            }
          } catch (error) {
            setError('Error parsing JSON file');
          }
        };

        reader.readAsText(e.target.files[0]);
      } else {
        setError('Invalid file type. Please select a .json file.');
      }
    } else if (e.target.files && e.target.files.length < limit) {
      setFiles(Array.from(e.target.files));
    } else setError('The number of files exceeds the limit.')
  }

  function handleDrop(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
    setError('');

    if (jsonOnly && e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'json') {
        setFiles([e.dataTransfer.files[0]]);

        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            if (e.target) {
              const data = JSON.parse(e.target.result as string);
              setJsonData?.(data);
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
    } else if (e.dataTransfer.files && e.dataTransfer.files.length < limit) {
      setFiles(Array.from(e.dataTransfer.files));
    } else setError('The number of files exceeds the limit.')
  }

  function handleDrag(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function handleLeave(e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    setDrag(false);
  }

  const handleReset = () => {
    setFiles([]);
    setError('');
  }

  const mods: Mods = {
    [cls.drag]: drag,
    [cls.max]: max
  }

  return (
    <form
      className={classNames(cls.form, mods, [])}
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
          multiple={multiply}
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
            {files.map(({ name }, id) =>
              <li className={cls.file} key={id}>
                {name}
              </li>)
            }
          </ul>
          <Button
            type="reset"
            className={cls.resetBtn}
            theme={ButtonTheme.CLEAR}
            onClick={handleReset}
          >
            <span>Delete files</span>
          </Button>
        </>
      }
    </form>
  );
});
