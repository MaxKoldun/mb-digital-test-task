import { memo } from 'react';
import cx from 'classnames';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

export const Input = memo<InputProps>(
  ({
    value,
    type = 'text',
    disabled,
    onChange,
    pattern,
    title,
    placeholder,
    error,
    name,
    required,
    className,
    autoFocus,
  }) => {
    return (
      <input
        name={name}
        required={required}
        value={value}
        type={type}
        title={title}
        pattern={pattern}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cx(
          'typography-body3 resize-none rounded text-grey-700 transition-colors duration-200 ease-in-out',
          'border-[1px] border-grey-300 bg-grey-100 px-4 py-3.5',
          'placeholder:text-grey-400 focus-visible:outline-none',
          {
            'border-red-500 focus-visible:border-red-500': error,
            'text-grey-700/[.65]': disabled,
            'focus-visible:border-primary-500': !error,
          },
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';
