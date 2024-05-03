import React, { memo, useState } from 'react';

import { Data } from "../../model/types/data";
import { FileUpload } from "../FileUpload/FileUpload";
import { Form } from "../Form";

import cls from './MainPage.module.scss'

const MainPage = () => {
  const [jsonData, setJsonData] = useState<Data>();

  return (
    <main className={cls.MainPage}>
      <div className={cls.container}>
        <FileUpload
          setJsonData={setJsonData}
          jsonOnly
          limit={1}
        />
        <Form
          jsonData={jsonData}
        />
      </div>
    </main>
  );
};

export default memo(MainPage);