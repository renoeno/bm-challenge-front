import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'rounded-lg py-2 px-4',
  {
    variants: {
      variant: {
        primary: 'bg-custom-main-green text-white',
        secondary:
          'border border-custom-tertiary-gray bg-white text-custom-tertiary-gray',
        outline: 'border border-custom-main-gray text-custom-dark-gray',
        ghost: 'hover:bg-gray-100 text-gray-900',
      },
      size: {
        sm: 'py-2 px-3 text-sm',
        md: 'py-2 px-4',
        lg: 'py-3 px-6 text-lg',
      },
      isDisabled: {
        true: 'cursor-not-allowed opacity-50 bg-gray-200',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      isDisabled: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

export default function Button({
  className,
  variant,
  size,
  isDisabled,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size, isDisabled: disabled || isDisabled }),
        className,
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
