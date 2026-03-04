/**
 * Collapsible toggle wrapper shared by all filter sections.
 * Fully controlled — parent owns `enabled` state (from the form).
 */

import { FunctionComponent, ReactNode } from 'react';

import { Collapsible, CollapsibleContent } from '../../../ui/collapsible';
import { Switch } from '../../../ui/switch';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}

const FilterSection: FunctionComponent<FilterSectionProps> = ({
  title,
  children,
  enabled,
  onEnabledChange,
}) => {
  return (
    <Collapsible open={enabled} onOpenChange={onEnabledChange}>
      <div className="flex items-center justify-between">
        <h5 className="text-md font-semibold">{title}</h5>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </div>
      <CollapsibleContent className="mt-2 py-2 rounded-sm">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSection;
