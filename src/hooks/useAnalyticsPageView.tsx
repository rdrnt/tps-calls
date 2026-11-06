import { useEffect } from 'react';
import * as Analytics from '../helpers/analytics';

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
