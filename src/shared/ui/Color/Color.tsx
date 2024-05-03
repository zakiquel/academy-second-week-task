import React, {memo, useState} from 'react';
import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import Arrow from "@/shared/assets/icons/arrow.svg";

import cls from './Color.module.scss';

interface ColorProps {
  className?: string;
  label?: string;
  required?: boolean;
  options: string[];
  readonly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}


export const Color = memo((props: ColorProps) => {
  const {
    className,
    label,
    options,
    readonly,
    value,
    onChange
  } = props;

  const optionList = options.map((opt) => (
    <div
      key={opt}
      className={cls.option}
      onClick={() => handleOptionClick(opt)}
    >
      <div style={{backgroundColor: `${opt}`, width: "30px", height: "30px"}}>
      </div>
    </div>
  ));

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    toggleDropdown();
    setInputValue(optionValue);
  };

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
          id={label}
          type="color"
          value={inputValue}
          placeholder={label}
          onChange={handleInputChange}
          className={cls.input}
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