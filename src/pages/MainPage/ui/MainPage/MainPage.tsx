import React, {memo, useState} from 'react';
import cls from './MainPage.module.scss'
import {JsonUpload} from "../JsonUpload/JsonUpload";
import {ButtonTypes, Data, FieldTypes, InputField, SelectField} from "../../model/types/data";
import {Input} from "@/shared/ui/Input";
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {Select} from "@/shared/ui/Select";

const MainPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonData, setJsonData] = useState<Data>();
  const [drag, setDrag] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [inputErrors, setInputErrors] = useState<boolean>(false);

  return (
    <main className={cls.MainPage}>
      <div className={cls.container}>
        <JsonUpload
          drag={drag}
          files={files}
          setDrag={setDrag}
          setFiles={setFiles}
          setJsonData={setJsonData}
          setError={setError}
          error={error}
        />
        <>
          {jsonData &&
            <form className={cls.form}>
              <h2>{jsonData.form_name}</h2>
              <p className={cls.description}>{jsonData.form_description}</p>
              {jsonData.form_fields.map((field) => {
                switch (field.type) {
                  case FieldTypes.TEXT:
                    const tField = field as InputField;
                    return (
                      <Input
                        id={tField.id}
                        key={field.id}
                        type="text"
                        required={tField.required}
                        placeholder={tField.placeholder}
                        maxLength={tField.maxlength}
                        minLength={tField.minlength}
                        pattern={tField.pattern}
                        mask={tField.mask}
                        setInputErrors={setInputErrors}
                      />
                    );
                  case FieldTypes.SELECT:
                    const sField = field as SelectField;
                    return (
                      <Select
                        key={sField.id}
                        label={sField.label}
                        required={sField.required}
                        multiple={sField.multiple}
                        options={sField.options}
                      />
                    );
                  case FieldTypes.PASSWORD:
                    const pField = field as InputField;
                    return (
                      <Input
                        id={pField.id}
                        key={pField.id}
                        type="password"
                        required={pField.required}
                        placeholder={pField.placeholder}
                        maxLength={pField.maxlength}
                        minLength={pField.minlength}
                        pattern={pField.pattern}
                      />
                    );
                }
              })}
              <div className={cls.btns}>
                {jsonData.form_buttons.map((btn) => (
                  <Button
                    key={btn.name}
                    disabled={btn.type === ButtonTypes.SUBMIT && inputErrors}
                    theme={ButtonTheme.PURPLE}
                    type={btn.type}
                  >
                    {btn.name}
                  </Button>
                ))}
              </div>
            </form>
          }
        </>
      </div>
    </main>
  );
};

export default memo(MainPage);