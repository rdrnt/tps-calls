import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { firestore } from '../../helpers/firebase';
import { TorontoTrafficCamera } from '../../containers/BetaFeature';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useAppDispatch } from '../../store';
import { setCameraList } from '../../store/actions';

const CAMERAS_REFRESH_INTERVAL_IN_MINUTES = 2.5;

const TorontoCamerasListener = () => {
  const dispatch = useAppDispatch();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchCameras = async () => {
    const camerasCollection = collection(firestore, 'toronto-traffic-cameras');
    const camerasQuery = query(camerasCollection, orderBy('date', 'desc'));
    const docs = await getDocs(camerasQuery);
    const cameras = docs.docs.map(doc => doc.data() as TorontoTrafficCamera);
    dispatch(setCameraList(cameras));
  };

  useEffect(() => {
    fetchCameras();

    timer.current = setTimeout(
      () => {
        fetchCameras();
        toast.success('Cameras refreshed');
      },
      CAMERAS_REFRESH_INTERVAL_IN_MINUTES * 60 * 1000
    );

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return null;
};

export default TorontoCamerasListener;
