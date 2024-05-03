import { memo } from 'react';
import cls from './TextArea.module.scss';

interface TextAreaProps {
  required: boolean;
  placeholder: string;
  maxLength?: number;
  id: string;
  label?: string;
}

export const TextArea = memo((props: TextAreaProps) => {
  const {
    label,
    required,
    placeholder,
    maxLength,
    id
  } = props;

  return (
    <div className={cls.TextArea}>
      <label htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={`${placeholder}...`}
        maxLength={maxLength}
        required={required}
        className={cls.area}
      />
    </div>
  );
});
