import { type ChangeEvent, useMemo } from 'react'

import cls from './Select.module.scss'
import {classNames, Mods} from "@/shared/lib/classNames/classNames";

export interface SelectOption<T extends string> {
  value: string;
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  required?: boolean
  multiple?: boolean
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
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

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }

  const optionList = useMemo(() => options?.map((opt) => (
    <option
      value={opt.value}
      className={cls.option}
      key={opt.value}
    >
      {opt.value}
    </option>
  )), [options])

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionList}
      </select>
    </div>
  )
}
