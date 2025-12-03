import { Incident } from '@rdrnt/tps-calls-shared';
import { Timestamp } from 'firebase/firestore';

export type LocalIncident = Omit<Incident<any>, 'date'> & {
  date: Date;
};

// Toronto Traffic Cameras
// Server types
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

export type LocalTorontoTrafficCamera = Omit<TorontoTrafficCamera, 'date'> & {
  date: Date;
};
