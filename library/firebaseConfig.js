import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import{getAuth, GoogleAuthProvider} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwe_LhJiPTfotza9pWfP5eCAPAHX_jzlg",
    authDomain: "rhythmicrights-82a82.firebaseapp.com",
    projectId: "rhythmicrights-82a82",
    storageBucket: "rhythmicrights-82a82.appspot.com",
    messagingSenderId: "183875118010",
    appId: "1:183875118010:web:f3411d63b198ea08aff383",
    measurementId: "G-JPQMNBJFJC"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(app).addScope('email');
export default app;