import React, { memo, useState } from 'react';

import { ButtonTypes, ColorField, Data, FieldTypes, FileField, InputField, SelectField } from "../../model/types/data";
import { FileUpload } from '../FileUpload/FileUpload';

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Color } from "@/shared/ui/Color";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { TextArea } from "@/shared/ui/TextArea";

import cls from './Form.module.scss';

interface FormProps {
  className?: string;
  jsonData?: Data;
}

export const Form = memo((props: FormProps) => {
  const {
    jsonData,
    className
  } = props;

  const [inputErrors, setInputErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (id: string, value: string) => {
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [id]: value,
      };
      console.log("Form data: ", updatedData);
      return updatedData;
    });
  };

  return (
    jsonData && (
      <form className={classNames(cls.Form, {}, [className])}>
        <h2>{jsonData.form_name}</h2>
        <p className={cls.description}>{jsonData.form_description}</p>
        {jsonData.form_fields.map((field) => {
          const inputField = field as InputField;
          const selectField = field as SelectField;
          const areaField = field as InputField;
          const colorField = field as ColorField;
          const fileField = field as FileField;
          switch (field.type) {
            case FieldTypes.TEXT:
            case FieldTypes.PASSWORD:
              return (
                <Input
                  id={inputField.id}
                  key={inputField.id}
                  type={inputField.type}
                  onInputChange={(value) =>
                    handleInputChange(field.id, value)}
                  required={inputField.required}
                  placeholder={inputField.placeholder}
                  maxLength={inputField.maxlength}
                  minLength={inputField.minlength}
                  pattern={inputField.pattern}
                  mask={inputField.mask}
                  setInputErrors={setInputErrors}
                />
              );
            case FieldTypes.SELECT:
              return (
                <Select
                  key={selectField.id}
                  label={selectField.label}
                  options={selectField.options}
                />
              );
            case FieldTypes.CHECKBOX:
              return (
                <Checkbox
                  label={field.label}
                  required={field.required}
                  id={field.id}
                />
              );
            case FieldTypes.FILE:
              return (
                <FileUpload
                  multiply
                  max
                  limit={fileField.max_count}
                />
              );
            case FieldTypes.TEXTAREA:
              return (
                <TextArea
                  id={areaField.id}
                  required={areaField.required}
                  placeholder={areaField.placeholder}
                  maxLength={areaField.maxlength}
                />
              );
            case FieldTypes.COLOR:
              return (
                <Color
                  options={colorField.options}
                />
              );
            default:
              return null;
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
    )
  );
});
