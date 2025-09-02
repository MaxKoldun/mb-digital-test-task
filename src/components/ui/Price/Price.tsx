import { memo } from 'react';

export const Price = memo(
  ({
    currency,
    amount,
    className,
  }: {
    currency: string;
    amount: number;
    className?: string;
  }) => {
    return (
      <span className={className} dir={'ltr'}>
        {currency} {amount}
      </span>
    );
  }
);

Price.displayName = 'Price';
