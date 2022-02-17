import {initializeApp} from "firebase/app";
initializeApp( {
  apiKey: "AIzaSyA03giC6PksHNYR-JouBL4Me1Kj-uThN-8",
  authDomain: "next-js-app-a0acf.firebaseapp.com",
  projectId: "next-js-app-a0acf",
  storageBucket: "next-js-app-a0acf.appspot.com",
  messagingSenderId: "1003763650762",
  appId: "1:1003763650762:web:6d5ee9ce068dc6fa482433",
  measurementId: "G-2ETMFNS4YJ"
 });


 import {getFirestore} from "firebase/firestore";
 const firestore = getFirestore();
 export default firestore