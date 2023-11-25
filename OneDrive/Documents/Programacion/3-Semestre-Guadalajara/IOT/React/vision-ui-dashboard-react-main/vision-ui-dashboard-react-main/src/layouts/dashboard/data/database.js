import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCbx5Kk75PykuxhT87vXFNYs5wDP8yERyE",
  authDomain: "reto-segundo.firebaseapp.com",
  databaseURL: "https://reto-segundo-default-rtdb.firebaseio.com",
  projectId: "reto-segundo",
  storageBucket: "reto-segundo.appspot.com",
  messagingSenderId: "536020154257",
  appId: "1:536020154257:web:f2c58589bd8d0c02998c30",
  measurementId: "G-XJSN9N593Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;