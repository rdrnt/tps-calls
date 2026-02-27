import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { FunctionComponent, ReactNode } from 'react';

import { Collapsible } from '../../../ui/collapsible';
import { Switch } from '../../../ui/switch';

const FilterSection: FunctionComponent<{
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}> = ({ title, content, defaultOpen = true }) => {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium">{title}</h5>
        <CollapsibleTrigger asChild>
          <Switch className="bg-tpscalls-primary data-[state=closed]:bg-tpscalls-primary/60" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 py-2 rounded-sm">
        {content}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSection;
