import React, {
  InputHTMLAttributes,
  memo,
} from 'react';

import {classNames, Mods} from "@/shared/lib/classNames/classNames";

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'readOnly'
>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  autofocus?: boolean;
  readonly?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    type = 'text',
    placeholder,
    autofocus,
    readonly,
    ...otherProps
  } = props;


  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.Input, mods, [className])}>
      <input
        type={type}
        value={value}
        className={cls.input}
        readOnly={readonly}
        {...otherProps}
        placeholder={placeholder}
      />
    </div>
  );
});
