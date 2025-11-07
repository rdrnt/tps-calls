import * as React from 'react';

import { ModalProps } from '.';

import { Analytics } from '../../helpers';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Heart, Mail } from 'lucide-react';

type ProjectInfoModalProps = ModalProps;

const ProjectInfoModal: React.FunctionComponent<ProjectInfoModalProps> = () => {
  React.useEffect(() => {
    Analytics.event({
      category: 'UI',
      action: Analytics.UI.SHOW_PROJECT_INFO,
    });
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>tpscalls</DialogTitle>
      </DialogHeader>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>About</AccordionTrigger>
          <AccordionContent>
            {`tpscalls.live is a real-time map of locations where the Toronto Police have responded to a call for service. These calls include incidents such as arrests, gun calls, collisions involving people or property, assaults, industrial accidents or disputes. Some calls for service will be, or are being, excluded for privacy reasons, including calls respecting domestic violence, sexual assault, or medical distress. Others calls may be excluded because they are part of an ongoing police operation.`}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Why am I seeing nothing new?</AccordionTrigger>
          <AccordionContent>
            {`Once in a while the Toronto Police's data feed goes offline. Unfortunately this is out of my control. If you have any questions, feel free to contact me.`}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Contact</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              Have a question? Feedback? Bug report? Feel free to connect with
              me via the button below.
              <Button type="button" variant="outline" className="w-fit" asChild>
                <a href="mailto:riley@drnt.ca">
                  <Mail />
                  Contact
                </a>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Download the mobile app</AccordionTrigger>
          <AccordionContent>
            <Button type="button" variant="outline" className="w-fit" asChild>
              <a href="/download" target="_blank" rel="noopener noreferrer">
                Visit Download Page
              </a>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>API & Open Source</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {`Tpscalls is proudly open source and now offers a REST API anyone can use! Explore the codebase and find more information on how to get started with the API at the links below.`}
              <Button type="button" variant="outline" className="w-fit" asChild>
                <a
                  href="https://github.com/rdrnt/tps-calls/blob/master/API.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Docs
                </a>
              </Button>

              <Button type="button" variant="outline" className="w-fit" asChild>
                <a
                  href="https://github.com/rdrnt/tps-calls"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Donate</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2">
              {`Your donations are greatly appreciated! They help cover project costs and keep the project alive.`}
              <Button type="button" variant="outline" className="w-fit" asChild>
                <a
                  href="https://ko-fi.com/drnt_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Heart />
                  Donate on Ko-fi
                </a>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProjectInfoModal;
