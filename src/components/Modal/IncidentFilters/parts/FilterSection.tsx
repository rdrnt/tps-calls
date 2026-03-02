/**
 * Collapsible toggle wrapper shared by all filter sections.
 * The Switch doubles as the Collapsible trigger via Radix `asChild`.
 * Fully controlled — parent owns `enabled` state (from the form).
 */

import { FunctionComponent, ReactNode } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
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
        <h5 className="text-sm font-medium">{title}</h5>
        <CollapsibleTrigger asChild>
          <Switch
            checked={enabled}
            className="bg-tpscalls-primary data-[state=unchecked]:bg-tpscalls-primary/60"
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 py-2 rounded-sm">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FilterSection;
