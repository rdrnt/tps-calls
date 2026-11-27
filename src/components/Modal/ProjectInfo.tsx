import * as React from 'react';
import { Link } from 'react-router';
import { BookOpen, Heart, Mail } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { ModalProps } from './types';

import * as Analytics from '../../helpers/analytics';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

const Section: React.FunctionComponent<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="grid gap-1 text-sm">
    <h3 className="font-medium">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{children}</p>
  </section>
);

const ProjectInfoModal: React.FunctionComponent<ModalProps> = ({ close }) => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_PROJECT_INFO,
    });
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>About tpscalls</DialogTitle>
        <DialogDescription className="leading-relaxed">
          A live map of Toronto Police calls for service: arrests, gun calls,
          collisions, assaults and other emergencies. Anything sensitive or tied
          to an active investigation is filtered out to protect privacy and
          safety.
        </DialogDescription>
      </DialogHeader>

      <Section title="Why am I seeing nothing new?">
        Once in a while the Toronto Police data feed goes offline. That&apos;s
        out of my control, and calls show up again once it&apos;s back.
      </Section>

      <Section title="Open source and API">
        The code is on GitHub, and there&apos;s a free REST API for the same
        data.
      </Section>

      <DialogFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" asChild>
          <Link to="/contact" onClick={close}>
            <Mail />
            Contact
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://ko-fi.com/drnt_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heart />
            Support
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://github.com/rdrnt/tps-calls"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://github.com/rdrnt/tps-calls/blob/master/API.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen />
            API docs
          </a>
        </Button>
      </DialogFooter>
    </>
  );
};

export default ProjectInfoModal;
