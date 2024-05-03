import React, { memo, useState } from 'react';

import cls from './TextArea.module.scss';

interface TextAreaProps {
  required: boolean;
  placeholder: string;
  maxLength?: number;
  id: string;
  label?: string;
  onTextChange?: (value: string) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
  const {
    label,
    required,
    placeholder,
    maxLength,
    id,
    onTextChange
  } = props;

  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    onTextChange?.(value);
  };

  return (
    <div className={cls.TextArea}>
      <label htmlFor={id}>
        {label}
      </label>
      <textarea
        value={value}
        id={id}
        placeholder={`${placeholder}...`}
        maxLength={maxLength}
        required={required}
        className={cls.area}
        onChange={handleChange}
      />
    </div>
  );
});
