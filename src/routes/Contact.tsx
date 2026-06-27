import { FunctionComponent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import useAnalyticsPageView from '@/hooks/useAnalyticsPageView';

// Kept as separate parts (never a contiguous `user@domain` literal) so the
// address doesn't appear in the served HTML/JS bundle for regex-based email
// harvesters to scrape. Assembled at runtime, so the link stays a normal,
// clickable, copy-pasteable mailto for real visitors.
const EMAIL_USER = 'riley';
const EMAIL_DOMAIN = 'drnt.ca';

const ContactPage: FunctionComponent = () => {
  useAnalyticsPageView({ path: '/contact' });

  const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

  return (
    <div className="bg-background text-foreground h-screen w-full overflow-y-auto antialiased">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-5">
        <SiteHeader />

        <main className="flex flex-1 flex-col justify-center py-20 md:py-28">
          <div className="max-w-xl">
            <h1 className="text-[40px] font-semibold leading-[1.04] tracking-tight sm:text-6xl">
              Get in <span className="text-tpscalls-primary">touch.</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed sm:text-lg">
              Found a bug, have an idea, or a question about the data behind
              tpscalls? Send me an email.
            </p>
            <a
              href={`mailto:${email}`}
              className="text-tpscalls-primary border-tpscalls-primary/25 hover:border-tpscalls-primary mt-10 inline-block border-b-2 font-mono text-[clamp(20px,5vw,28px)] font-medium tracking-[-0.01em] transition-colors"
            >
              {email}
            </a>
          </div>
        </main>

        <SiteFooter
          actions={
            <div className="flex gap-3">
              <Button asChild variant="outline" className="h-11 px-4">
                <Link to="/">Back to map</Link>
              </Button>
              <Button asChild className="h-11 px-4">
                <Link to="/download">Download the app</Link>
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ContactPage;
