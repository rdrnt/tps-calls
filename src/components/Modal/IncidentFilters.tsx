import { FunctionComponent, ReactNode, useState } from 'react';

import { DialogHeader, DialogFooter, DialogTitle } from '../ui/dialog';

import { Slider } from '../ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { ModalProps } from '.';

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

const IncidentFiltersModal: FunctionComponent<ModalProps> = ({ close }) => {
  const [distance, setDistance] = useState(10);

  const onResetFilters = () => {
    // Do something
    close();
  };

  return (
    <>
      <DialogHeader className="mb-2">
        <DialogTitle>Filters</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <FilterSection
            title="Distance"
            content={
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-20">
                  {distance} km
                </span>
                <Slider
                  defaultValue={[10]}
                  max={20}
                  min={0.1}
                  step={0.1}
                  className="w-full lg:w-[60%]"
                  value={[distance]}
                  onValueChange={value => setDistance(value[0])}
                />
              </div>
            }
          />
        </div>
        <FilterSection title="Date" content={null} />
      </div>
      <DialogFooter className="flex-row justify-center gap-4 mt-4">
        <Button variant="outline" onClick={onResetFilters}>
          Reset
        </Button>
        <Button>Apply</Button>
      </DialogFooter>
    </>
  );
};

export default IncidentFiltersModal;
