import React, { memo } from 'react';
import cls from './Checkbox.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";

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
    id
  } = props;
  return (
    <div className={classNames(cls.Checkbox, {}, [className])}>
      <input
        type="checkbox"
        className={cls.input}
        id={id}
      />
      <label
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
