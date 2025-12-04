import { useEffect, useRef } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import { firestore } from '../../helpers/firebase';
import {
  LocalTorontoTrafficCamera,
  ServerTorontoTrafficCamera,
} from '../../types';
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
    const cameras = docs.docs.map(
      doc => doc.data() as ServerTorontoTrafficCamera
    );
    const convertedCameras: LocalTorontoTrafficCamera[] = cameras.map(
      camera => ({
        ...camera,
        date: camera.date.toDate().valueOf(),
      })
    );
    dispatch(setCameraList(convertedCameras));
  };

  useEffect(() => {
    fetchCameras();

    timer.current = setTimeout(
      () => {
        fetchCameras();
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
