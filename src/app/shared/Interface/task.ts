import firebase from 'firebase/compat/app';
export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: firebase.firestore.Timestamp | Date; 
    completed: boolean;
    status?: string;
    markerPosition?: google.maps.LatLngLiteral;
    userId?: String;
  }
  