// components/typography.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'rounded bg-muted px-1 py-0.5 font-mono text-sm',
      blockquote: 'mt-6 border-l-2 pl-6 italic text-muted-foreground',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
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

type BaseProps = React.HTMLAttributes<Element> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
  };

function Text({ className, variant, align, asChild, ...props }: BaseProps) {
  const Comp = asChild ? Slot : 'p';
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
