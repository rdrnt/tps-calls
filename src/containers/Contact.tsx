import { Mail } from 'lucide-react';

import { Typography } from '../components/Typography';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';

import AppLogo from '../assets/images/appStoreIcon.jpg';
import useAnalyticsPageView from '../hooks/useAnalyticsPageView';

const ContactPage = () => {
  useAnalyticsPageView({ path: '/contact' });

  return (
    <div className="bg-zinc-100 h-full w-full">
      <Container>
        <div className="w-full h-auto py-4">
          <a href="/" className="h-full p-0">
            <img
              src={AppLogo}
              alt="App Logo"
              className="w-12 h-12 rounded-md shadow-md"
            />
          </a>
        </div>
        <div className="flex flex-col items-start justify-center h-full min-h-svh">
          <Typography variant="h2" className="mb-2">
            Contact
          </Typography>

          <Typography variant="p">
            Whether you have a question about tpscalls, a bug report, or just
            want to provide feedback, feel free to reach out.
          </Typography>
          <Button
            asChild
            className="mt-8 bg-secondary hover:bg-primary/20 hover:text-secondary text-primary"
          >
            <a href="mailto:riley@drnt.ca">
              <Mail />
              <Typography variant="p">Email</Typography>
            </a>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
