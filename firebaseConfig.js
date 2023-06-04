// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_OjLc3yrr5jj07juq82-FzMel4NpvTBk",
  authDomain: "infoflix-2023.firebaseapp.com",
  projectId: "infoflix-2023",
  storageBucket: "infoflix-2023.appspot.com",
  messagingSenderId: "632256087846",
  appId: "1:632256087846:web:4712649e654784a77ea3e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };