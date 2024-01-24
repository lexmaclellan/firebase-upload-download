import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAfnYmvShCaJpm2LJX5Luixjvy_48R0BvU",
  authDomain: "fire-upl-dwnl.firebaseapp.com",
  projectId: "fire-upl-dwnl",
  storageBucket: "fire-upl-dwnl.appspot.com",
  messagingSenderId: "78983854213",
  appId: "1:78983854213:web:73a846ef302da0dfc751ec"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore();