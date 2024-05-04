import React, { memo, useState } from 'react';

import Arrow from "@/shared/assets/icons/arrow.svg";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";

import cls from './Color.module.scss';

interface ColorProps {
  className?: string;
  options: string[];
  readonly?: boolean;
  id?: string;
  onColorChange?: (value: string) => void;
  required: boolean;
  setInputErrors?: (value: boolean) => void;
}


export const Color = memo((props: ColorProps) => {
  const {
    className,
    options,
    readonly,
    id,
    required,
    onColorChange,
    setInputErrors
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.validationMessage) {
      setInputErrors?.(false);
    } else {
      setInputErrors?.(true);
    }
    const { value } = e.target;
    setValue(value);
    onColorChange?.(value);
  };

  const handleOptionClick = (optionValue: string) => {
    toggleDropdown();
    setValue(optionValue);
    onColorChange?.(value);
  };

  const optionList = options.map((opt) => (
    <div
      key={opt}
      className={cls.option}
      onClick={() => handleOptionClick(opt)}
    >
      <div style={{ backgroundColor: `${opt}`, width: "30px", height: "30px" }} />
    </div>
  ));

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.open]: isOpen
  };

  return (
    <div
      className={classNames(cls.Wrapper, mods, [className])}
    >
      <div
        className={cls.select}
        onClick={toggleDropdown}
      >
        <input
          id={id}
          type="color"
          value={value}
          onChange={handleChange}
          className={cls.input}
          required={required}
        />
        <span className={cls.arrow}>
          <Arrow />
        </span>
      </div>
      {isOpen &&
        <div className={cls.dropdown}>
          {optionList}
        </div>
      }
    </div>
  );
});