import { forwardRef, type ElementType, type ReactNode } from 'react';

const variantsToElementMap = {
  title1: 'h1',
  heading1: 'h4',
  body1: 'p',
  caption1: 'p',
};

const variantsToClassMap = {
  title1: 'typography-title1',
  heading1: 'typography-heading1',
  body1: 'typography-body1',
  caption1: 'typography-caption1',
};

type Variant = keyof typeof variantsToElementMap;

type TypographyProps<T extends Variant> = {
  variant: T;
  className?: string;
  children?: ReactNode;
  component?: ElementType;
};

export const Typography = forwardRef<HTMLElement, TypographyProps<Variant>>(
  ({ variant, children, className, component }, ref) => {
    const Component = component ?? variantsToElementMap[variant];

    return (
      <Component
        ref={ref}
        className={`${variantsToClassMap[variant]} ${className ?? ''}`}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
