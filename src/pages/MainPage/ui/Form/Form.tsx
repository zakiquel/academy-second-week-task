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
  const [_, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record<string, string | File[]>>({});

  const handleSubmit = async () => {
      try {
        const response = await fetch('http://localhost:8000/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response) {
          throw new Error('No response');
        }
      } catch (error) {
        throw new Error('Fetching error');
      }
    setSubmitted(true);
  };

  const handleChange = (id: string, value: string | File[]) => {
    setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
  };

  return (
    jsonData && (
      <form
        className={classNames(cls.Form, {}, [className])}
        onSubmit={(e) => e.preventDefault()}
      >
        <h2>{jsonData.form_name}</h2>
        <p className={cls.description}>{jsonData.form_description}</p>
        {jsonData.form_fields.map((field) => {
          const input = field as InputField;
          const select = field as SelectField;
          const area = field as InputField;
          const color = field as ColorField;
          const file = field as FileField;
          switch (field.type) {
            case FieldTypes.TEXT:
            case FieldTypes.PASSWORD:
              return (
                <Input
                  id={input.id}
                  key={input.id}
                  type={input.type}
                  onInputChange={(value) =>
                    handleChange(input.id, value)}
                  required={input.required}
                  placeholder={input.placeholder}
                  maxLength={input.maxlength}
                  minLength={input.minlength}
                  pattern={input.pattern}
                  mask={input.mask}
                  setInputErrors={setInputErrors}
                />
              );
            case FieldTypes.SELECT:
              return (
                <Select
                  key={select.id}
                  label={select.label}
                  onSelectChange={(value) =>
                    handleChange(select.id, value)}
                  options={select.options}
                />
              );
            case FieldTypes.CHECKBOX:
              return (
                <Checkbox
                  label={field.label}
                  key={field.id}
                  required={field.required}
                  onCheckboxChange={(value) =>
                    handleChange(field.id, value)
                  }
                  id={field.id}
                />
              );
            case FieldTypes.FILE:
              return (
                <FileUpload
                  multiply
                  id={field.id}
                  max
                  key={field.id}
                  onFileChange={(value) =>
                    handleChange(field.id, value)
                  }
                  limit={file.max_count}
                />
              );
            case FieldTypes.TEXTAREA:
              return (
                <TextArea
                  id={area.id}
                  required={area.required}
                  onTextChange={(value) =>
                    handleChange(area.id, value)
                  }
                  placeholder={area.placeholder}
                  maxLength={area.maxlength}
                  key={area.id}
                />
              );
            case FieldTypes.COLOR:
              return (
                <Color
                  options={color.options}
                  key={color.id}
                  id={color.id}
                  required={color.required}
                  onColorChange={(value) =>
                    handleChange(color.id, value)
                  }
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
              onClick={handleSubmit}
            >
              {btn.name}
            </Button>
          ))}
        </div>
      </form>
    )
  );
});
