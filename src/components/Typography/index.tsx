// components/typography.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl',
      h2: 'scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-md font-semibold tracking-tight',
      p: 'text-base leading-7',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
  },
});

export const getTextVariantClassName = (
  variant: VariantProps<typeof textVariants>['variant'],
  align?: VariantProps<typeof textVariants>['align']
) => {
  return cn(textVariants({ variant, align }));
};

type BaseProps = React.HTMLAttributes<Element> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  };

function Text({ className, variant, align, asChild, ...props }: BaseProps) {
  const Comp = asChild ? Slot : variant || 'p';
  return (
    <Comp
      className={cn(textVariants({ variant, align }), className)}
      {...props}
    />
  );
}

// Polymorphic primitive if you just want one component
export function Typography(props: BaseProps) {
  return <Text {...props} />;
}
