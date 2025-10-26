import { useEffect } from 'react';
import { Analytics } from '../helpers';

interface UseAnalyticsPageViewProps {
  path: string;
  onRun?: () => void;
}

const useAnalyticsPageView = ({ path, onRun }: UseAnalyticsPageViewProps) => {
  useEffect(() => {
    Analytics.pageview(path);
    onRun?.();
  }, [path, onRun]);
};

export default useAnalyticsPageView;
