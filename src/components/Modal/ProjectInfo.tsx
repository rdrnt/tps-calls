import * as React from 'react';

import { ModalProps } from '.';

import AppStoreIcon from '../../assets/images/appStoreDownload.png';
import PlayStoreIcon from '../../assets/images/googlePlayDownload.png';

import { Analytics } from '../../helpers';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Heart, Mail } from 'lucide-react';
import { APPSTORE_DOWNLOAD_LINK } from '../../config';
import { Typography } from '../Typography';

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
            {`tpscalls.live gives a live overview of TPS activity in Toronto. You can see arrests, gun calls, collisions, assaults and various emergency incidents. Anything sensitive or tied to an active investigation is filtered out to maintain privacy and safety.`}
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
            <div className="flex flex-row gap-2">
              <a
                href={APPSTORE_DOWNLOAD_LINK.IOS}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={AppStoreIcon} />
              </a>

              <a
                href={APPSTORE_DOWNLOAD_LINK.ANDROID}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={PlayStoreIcon} />
              </a>
            </div>
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
      </Accordion>
      <DialogFooter className="justify-center align-middle">
        <div className="flex flex-row gap-2 justify-center align-middle w-full">
          <Button type="button" variant="outline" asChild>
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
      </DialogFooter>
    </>
  );
};

export default ProjectInfoModal;
