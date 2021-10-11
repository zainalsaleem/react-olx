import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
const firebaseConfig = {
  apiKey: "AIzaSyBufqNrrFB-0VXd0dF-xPz4yZ0uBpwkICw",
  authDomain: "olx-zainal.firebaseapp.com",
  projectId: "olx-zainal",
  storageBucket: "olx-zainal.appspot.com",
  messagingSenderId: "732173042433",
  appId: "1:732173042433:web:3afaab32be74a368235100",
  measurementId: "G-F6727B9F0R"
};

  export default firebase.initializeApp(firebaseConfig)