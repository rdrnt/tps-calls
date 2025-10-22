import { useEffect, useState } from 'react';
import { Analytics } from '../helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { firestore } from '../helpers/firebase';

export interface TorontoTrafficCameraView {
  direction: string;
  imageUrl: string;
}

export interface TorontoTrafficCamera {
  id: string; // REC_ID as string
  name: string; // "<MAINROAD> & <CROSSROAD>"
  location: { latitude: number; longitude: number };
  date: Timestamp; // when mapped
  cameras: TorontoTrafficCameraView[]; // IMAGEURL/REFURL* + DIRECTION*
}

const BetaFeature = () => {
  const [torontoTrafficCameras, setTorontoTrafficCameras] = useState<
    TorontoTrafficCamera[]
  >([]);

  useEffect(() => {
    const camerasCollection = collection(firestore, 'toronto-traffic-cameras');
    const camerasQuery = query(camerasCollection, orderBy('date', 'desc'));
    getDocs(camerasQuery).then(docs => {
      const cameras = docs.docs.map(doc => doc.data() as TorontoTrafficCamera);
      console.log('cams', cameras);
      setTorontoTrafficCameras(cameras);
    });
  }, []);
  useEffect(() => {
    Analytics.pageview('/beta-feature');
  }, []);

  return (
    <div className="bg-background p-6 overflow-y-auto h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Toronto Traffic Cameras
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time traffic camera feeds from intersections across Toronto.
            Click on any camera to view live traffic conditions.
          </p>
        </div>

        {torontoTrafficCameras.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading traffic cameras...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {torontoTrafficCameras.map(camera => (
              <Card
                key={camera.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{camera.name}</CardTitle>
                  <CardDescription className="text-base">
                    {camera.location.latitude.toFixed(4)},{' '}
                    {camera.location.longitude.toFixed(4)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {camera.cameras.map((cameraView, index) => (
                      <div key={`${camera.id}-${index}`} className="space-y-2">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <img
                            src={cameraView.imageUrl}
                            alt={`${camera.name} - ${cameraView.direction}`}
                            className="w-full h-full object-cover"
                            onError={e => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                'https://via.placeholder.com/300x200/6B7280/FFFFFF?text=Image+Not+Available';
                            }}
                          />
                        </div>
                        <h4 className="text-sm font-medium text-center">
                          {cameraView.direction}
                        </h4>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BetaFeature;
