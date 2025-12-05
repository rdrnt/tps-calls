import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Fuse from 'fuse.js';

import { Analytics } from '../helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';

import { firestore } from '../helpers/firebase';

import {
  ServerTorontoTrafficCamera,
  LocalTorontoTrafficCamera,
} from '../types';

const TrafficCams = () => {
  const [search, setSearch] = useState('');
  const [torontoTrafficCameras, setTorontoTrafficCameras] = useState<
    LocalTorontoTrafficCamera[]
  >([]);
  const [defaultTorontoTrafficCameras, setDefaultTorontoTrafficCameras] =
    useState<LocalTorontoTrafficCamera[]>([]);

  useEffect(() => {
    const camerasCollection = collection(firestore, 'toronto-traffic-cameras');
    const camerasQuery = query(camerasCollection, orderBy('date', 'desc'));
    getDocs(camerasQuery).then(docs => {
      const cameras = docs.docs.map(
        doc => doc.data() as ServerTorontoTrafficCamera
      );
      const convertedCameras: LocalTorontoTrafficCamera[] = cameras.map(
        camera => ({
          ...camera,
          date: camera.date.toDate().valueOf(),
        })
      );
      setTorontoTrafficCameras(convertedCameras);
      setDefaultTorontoTrafficCameras(convertedCameras);
    });
  }, []);

  useEffect(() => {
    Analytics.pageview('/traffic-cams');
  }, []);

  const camerasToUse = useMemo(() => {
    if (search.length > 0) {
      const fuse = new Fuse(torontoTrafficCameras, { keys: ['name'] });
      const results = fuse.search(search);
      return results.map(result => result.item);
    }
    return defaultTorontoTrafficCameras;
  }, [torontoTrafficCameras, search]);

  return (
    <div className="bg-background p-6 overflow-y-auto h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Toronto Traffic Cameras
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time traffic camera feeds from intersections across Toronto.
          </p>
          <Input
            type="search"
            placeholder="Search for a camera"
            className="w-full max-w-md mx-auto mt-4"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {defaultTorontoTrafficCameras.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading traffic cameras...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {camerasToUse.map(camera => (
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
                  {/* 
                  <CardAction>
                    
                    <Button asChild>
                      <a
                        href={`https://www.google.com/maps/search/${camera.location.latitude},${camera.location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View On Map
                      </a>
                    </Button>
                    
                  </CardAction>
                  */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {camera.cameras
                      .filter(cam => cam.direction === 'Default')
                      .map((cameraView, index) => (
                        <div
                          key={`${camera.id}-${index}`}
                          className="space-y-2"
                        >
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

export default TrafficCams;
