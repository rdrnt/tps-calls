import * as Sentry from '@sentry/react';
import { FunctionComponent, PropsWithChildren } from 'react';

import { Button } from '../ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '../ui/empty';

const ErrorFallback: FunctionComponent = () => (
  <Empty className="bg-background text-foreground h-screen w-full">
    <EmptyHeader>
      <EmptyTitle className="text-2xl">Something went wrong</EmptyTitle>
      <EmptyDescription>
        Reload the page, or head back to the live map.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent className="flex-row justify-center">
      <Button onClick={() => window.location.reload()}>Reload</Button>
      <Button asChild variant="outline">
        {/* A plain link, since the router may be what crashed. */}
        <a href="/">Back to map</a>
      </Button>
    </EmptyContent>
  </Empty>
);

const ErrorBoundary: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
