

// src/lib/firebase.ts
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTUZ9ZWg2burT3PJaNBRB0BFTUUFpDIoI",
    authDomain: "todo-app-2aad8.firebaseapp.com",
    projectId: "todo-app-2aad8",
    storageBucket: "todo-app-2aad8.firebasestorage.app",
    messagingSenderId: "554740396229",
    appId: "1:554740396229:web:71ec6df5c98c884d9080ac"
  };

let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);