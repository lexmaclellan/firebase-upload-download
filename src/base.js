import firebase from 'firebase'
import 'firebase/storage'

export const app = firebase.initializeApp({
    "projectId": "fire-upl-dwnl",
    "appId": "1:78983854213:web:53e808fb91200469c751ec",
    "storageBucket": "fire-upl-dwnl.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyAfnYmvShCaJpm2LJX5Luixjvy_48R0BvU",
    "authDomain": "fire-upl-dwnl.firebaseapp.com",
    "messagingSenderId": "78983854213"
  });