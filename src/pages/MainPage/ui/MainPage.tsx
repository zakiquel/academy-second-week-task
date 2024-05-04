import React, { memo, useState } from 'react';

import { FileUpload } from '@/features/FileUpload';
import { Form } from "@/features/Form";
import { Data } from "@/shared/types/data";

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
          setData={setJsonData}
        />
      </div>
    </main>
  );
};

export default memo(MainPage);