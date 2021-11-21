import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCptonN8j16u2aU_ax5vjMbIT-F9-K1xEo",
    authDomain: "hello-to-talk.firebaseapp.com",
    projectId: "hello-to-talk",
    storageBucket: "hello-to-talk.appspot.com",
    messagingSenderId: "464540917194",
    appId: "1:464540917194:web:ce992afd623c81adea8333"
  });

 export const firestore = firebaseApp.firestore();
 
 export default firebaseApp;