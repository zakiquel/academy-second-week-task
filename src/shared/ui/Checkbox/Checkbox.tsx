import React, { memo } from 'react';

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from './Checkbox.module.scss';

interface CheckboxProps {
  className?: string;
  label?: string;
  required?: boolean;
  id?: string;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const {
    className,
    label,
    id,
    required
  } = props;
  return (
    <div className={classNames(cls.Checkbox, {}, [className])}>
      <input
        type="checkbox"
        className={cls.input}
        id={id}
        required={required}
      />
      <label
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
