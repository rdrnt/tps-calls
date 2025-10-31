import { useEffect } from 'react';
import { firestore } from '../../helpers/firebase';
import { TorontoTrafficCamera } from '../../containers/BetaFeature';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useAppDispatch } from '../../store';
import { setCameraList } from '../../store/actions';

const TorontoCamerasListener = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const camerasCollection = collection(firestore, 'toronto-traffic-cameras');
    const camerasQuery = query(camerasCollection, orderBy('date', 'desc'));
    getDocs(camerasQuery).then(docs => {
      const cameras = docs.docs.map(doc => doc.data() as TorontoTrafficCamera);

      dispatch(setCameraList(cameras));
    });
  }, []);
  return null;
};

export default TorontoCamerasListener;
