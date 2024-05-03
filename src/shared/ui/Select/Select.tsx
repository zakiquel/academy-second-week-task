import React, { useMemo, useState } from 'react';

import Arrow from "@/shared/assets/icons/arrow.svg";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";

import cls from './Select.module.scss';

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: string[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState(value || '');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredOptions = useMemo(() => {
    if (!options) return [];
    return options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (optionValue: T) => {
    if (onChange) {
      onChange(optionValue);
    }
    toggleDropdown();
    setInputValue(optionValue);
  };

  const optionList = filteredOptions.map((opt) => (
    <div
      key={opt}
      className={cls.option}
      onClick={() => handleOptionClick(opt as T)}
    >
      {opt}
    </div>
  ));

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.open]: isOpen
  };

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      <div className={cls.select} onClick={toggleDropdown}>
        <input
          id={label}
          type="text"
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
};