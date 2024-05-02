import React, {
  FocusEvent,
  InputHTMLAttributes,
  memo, useState
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
  label?: string;
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
    label,
    ...otherProps
  } = props;

  const [validationMessage, setValidationMessage] = useState<string>('');
  const [dirty, setDirty] = useState<boolean>(false);

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    setValidationMessage(e.target.validationMessage)
  };

  const handleBlur = () => {
    setDirty(true);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  const inputMods: Mods = {
    [cls.err]: (validationMessage && dirty)
  }

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      <label>
        <span>{label}</span>
        <input
          type={type}
          value={value}
          className={classNames(cls.input, inputMods)}
          readOnly={readonly}
          onBlur={handleBlur}
          onChange={handleChange}
          {...otherProps}
          placeholder={placeholder}
        />
        {validationMessage && dirty && <span className={cls.error}>{validationMessage}</span>}
      </label>
    </div>
  );
});
