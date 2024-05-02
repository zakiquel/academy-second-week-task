import React, { useMemo, useState } from 'react'

import cls from './Select.module.scss'
import { classNames, Mods } from "@/shared/lib/classNames/classNames";


interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  required?: boolean;
  multiple?: boolean;
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
    required
  } = props

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredOptions = useMemo(() => {
    if (!options) return [];
    return options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (optionValue: T) => {
    if (onChange) {
      onChange(optionValue);
    }
    toggleDropdown();
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
    [cls.open]: isOpen // Добавление класса, если выпадающий список открыт
  };

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      <div className={cls.select} onClick={toggleDropdown}>
        <input
          id={label}
          type="text"
          value={value}
          placeholder={label}
          onChange={handleInputChange}
          className={cls.input}
        />
        <span className={cls.arrow}>
          &#9660;
        </span>
      </div>
      {isOpen &&
        <div className={cls.dropdown}>
          {optionList}
        </div>
      }
    </div>
  )
}