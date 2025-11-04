import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Typography } from '../components/Typography';
import { Container } from '../components/ui/container';
import { Button } from '../components/ui/button';

import AppLogo from '../assets/images/appStoreIcon.jpg';
import useAnalyticsPageView from '../hooks/useAnalyticsPageView';

const ContactPage = () => {
  useAnalyticsPageView({ path: '/contact' });

  return (
    <div className="bg-background w-full h-screen">
      <Container className="h-full">
        <div className="flex flex-col h-full">
          <div className="w-full py-6 flex items-center justify-start">
            <a href="/" className="h-full p-0">
              <img
                src={AppLogo}
                alt="App Logo"
                className="w-12 h-12 rounded-md shadow-md"
              />
            </a>
          </div>
          <div className="flex flex-col items-center justify-center h-full grow">
            <Typography variant="h1" className="mb-4">
              Contact
            </Typography>

            <Typography variant="p" className="text-center max-w-md">
              Have a question about the project or want to connect? Get in touch
              via the button below.
            </Typography>
            <Button asChild className="mt-10">
              <a href="mailto:riley@drnt.ca">
                <Mail />
                <Typography variant="p">Email Me</Typography>
              </a>
            </Button>
          </div>
          <footer className="flex flex-col items-center justify-center w-full py-6">
            <Link to="/">
              <Typography variant="p" className="text-foreground text-sm">
                Back to Map
              </Typography>
            </Link>
          </footer>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
