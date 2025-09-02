import cx from 'classnames';
import { Loader } from '@components/ui';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonProps = {
  children?: ReactNode;
  loading?: boolean;
  size?: 'lg' | 'sm' | 'xs';
  loaderColor?: string;
  block?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  loading = false,
  size = 'lg',
  block = false,
  disabled,
  loaderColor = 'white',
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={cx(
        'block min-h-[3rem] rounded border border-grey-300 text-center text-sm',
        {
          'flex items-center justify-center': loading,
          'min-h-[3rem] px-4 py-3': size === 'lg',
          'min-h-[2.5rem] px-4 py-2.5': size === 'sm',
          'min-h-[2rem] px-4 py-1.5': size === 'xs',
          'w-full': block,
        },
        className
      )}
    >
      {loading ? (
        <Loader height="1rem" width="1rem" borderColor={loaderColor} />
      ) : (
        children
      )}
    </button>
  );
}
