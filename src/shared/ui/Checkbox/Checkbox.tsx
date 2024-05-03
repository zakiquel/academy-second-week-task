import React, { memo, useState } from 'react';

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from './Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  label?: string;
  required?: boolean;
  id?: string;
  onCheckboxChange?: (value: string) => void;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    label,
    id,
    required,
    onCheckboxChange
  } = props;

  const [value, setValue] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setValue(value);
    onCheckboxChange?.(JSON.stringify(value));
  };

  return (
    <div className={classNames(cls.Checkbox, {}, [className])}>
      <input
        type="checkbox"
        checked={value}
        className={cls.input}
        id={id}
        required={required}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
