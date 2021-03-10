import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA2Zy3UWY7pwUTpg4vi9ZMPTqApQuiybwU",
  authDomain: "slack-clone-6f2e2.firebaseapp.com",
  projectId: "slack-clone-6f2e2",
  storageBucket: "slack-clone-6f2e2.appspot.com",
  messagingSenderId: "501635838708",
  appId: "1:501635838708:web:b6712293414bbf661da4a1",
  measurementId: "G-T81PX4LHS3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };