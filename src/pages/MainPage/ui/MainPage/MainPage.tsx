import React, {memo, useState} from 'react';
import cls from './MainPage.module.scss'
import {FileUpload} from "@/pages/MainPage/ui/FileUpload/FileUpload";
import {ButtonTypes, ColorField, Data, FieldTypes, InputField, SelectField} from "../../model/types/data";
import {Input} from "@/shared/ui/Input";
import {Button, ButtonTheme} from "@/shared/ui/Button";
import {Select} from "@/shared/ui/Select";
import {Checkbox} from "@/shared/ui/Checkbox";
import {TextArea} from "@/shared/ui/TextArea";
import {Color} from "@/shared/ui/Color";

const MainPage = () => {
  const [jsonData, setJsonData] = useState<Data>();
  const [inputErrors, setInputErrors] = useState<boolean>(false);

  return (
    <main className={cls.MainPage}>
      <div className={cls.container}>
        <FileUpload
          setJsonData={setJsonData}
          jsonOnly
          limit={1}
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
                  case FieldTypes.CHECKBOX:
                    return (
                      <Checkbox
                        label={field.label}
                        required={field.required}
                        id={field.id}
                      />
                    )
                  case FieldTypes.FILE:
                      return (
                        <FileUpload
                          multiply
                          max
                          limit={5}
                        />
                      )
                  case FieldTypes.TEXTAREA:
                    const aField = field as InputField;
                    return (
                      <TextArea
                        id={aField.id}
                        required={aField.required}
                        placeholder={aField.placeholder}
                        maxLength={aField.maxlength}
                      />
                    )
                  case FieldTypes.COLOR:
                    const cField = field as ColorField;
                    return (
                      <Color
                        options={cField.options}
                      />
                    )
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