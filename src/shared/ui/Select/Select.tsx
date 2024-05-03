import React, { useMemo, useState } from 'react';

import Arrow from "@/shared/assets/icons/arrow.svg";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";

import cls from './Select.module.scss';

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: string[];
  id?: string;
  readonly?: boolean;
  onSelectChange?: (value: string) => void;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className,
    label,
    options,
    readonly,
    onSelectChange,
    id,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredOptions = useMemo(() => {
    if (!options) return [];
    return options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    setSearchTerm(value);
    onSelectChange?.(value);
  };

  const handleOptionClick = (optionValue: T) => {
    onSelectChange?.(optionValue);
    toggleDropdown();
    setValue(optionValue);
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
          id={id}
          type="text"
          value={value}
          placeholder={label}
          onChange={handleChange}
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