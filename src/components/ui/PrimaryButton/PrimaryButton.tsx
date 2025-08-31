import cx from 'classnames';
import { Button } from '../Button';
import { type ReactNode } from 'react';

import type { ButtonProps } from '../Button/Button';

export type PrimaryButtonProps = ButtonProps & {
  children?: ReactNode;
};

export function PrimaryButton({
  children,
  loading = false,
  size = 'lg',
  block = false,
  disabled,
  onClick,
  className,
}: PrimaryButtonProps) {
  const lgButtonClassNames = cx(
    'bg-primary-600 text-white active:bg-primary-700',
    {
      'cursor-not-allowed active:bg-primary-700': disabled || loading,
      'opacity-50': disabled,
    }
  );

  const smButtonClassNames = cx(
    'rounded-sm bg-primary-100 font-semibold text-primary-600 active:bg-primary-200',
    {
      'bg-primary-200': loading,
      'cursor-not-allowed': disabled || loading,
      'bg-primary-100 opacity-50 active:bg-primary-100': disabled,
    }
  );

  return (
    <Button
      onClick={onClick}
      loading={loading}
      size={size}
      block={block}
      disabled={disabled || loading}
      className={cx(
        'border-none cursor-pointer',
        {
          [lgButtonClassNames]: size === 'lg',
          [smButtonClassNames]: size === 'sm',
        },
        className
      )}
    >
      {children}
    </Button>
  );
}
