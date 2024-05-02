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

const emailMsg = 'Email должен быть в формате user@example.com';
const passwordMsg = 'Пароль должен содержать специальные символы и быть длиннее 8';
const passwordConfirmMsg = 'Пароли должны совпадать';
const dateMsg = 'Укажите дату в правильном формате';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  autofocus?: boolean;
  readonly?: boolean;
  mask?: string;
  pattern?: string;
  setInputErrors?: (value: boolean) => void;
  id?: string;
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
    mask,
    pattern,
    id,
    setInputErrors,
    ...otherProps
  } = props;

  const [validationMessage, setValidationMessage] = useState<string>('');
  const [dirty, setDirty] = useState<boolean>(false);

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    setValidationMessage(e.target.validationMessage);
    if (!e.target.validationMessage) {
      setInputErrors?.(false);
    } else {
      setInputErrors?.(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setDirty(true);
    let msg;
    switch (id) {
      case 'email':
        msg = emailMsg;
        break;
      case 'password':
        msg = passwordMsg;
        break;
      case 'confirm_password':
        msg = passwordConfirmMsg;
        break;
      case 'date':
        msg = dateMsg;
        break;
    }
    if (pattern) {
      const isValid = new RegExp(pattern).test(e.target.value);
      if (!isValid) {
        setValidationMessage(`${msg}`);
        setInputErrors?.(true);
      }
    }
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
