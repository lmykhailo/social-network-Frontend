import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV7D6z3QbI_pmu7cXGsXvWBMjRrHT81O8",
  authDomain: "social-network-project-a21d3.firebaseapp.com",
  projectId: "social-network-project-a21d3",
  storageBucket: "social-network-project-a21d3.appspot.com",
  messagingSenderId: "169011638659",
  appId: "1:169011638659:web:ddde74223cf4699b7d46b6",
  measurementId: "G-4RVJWHK7P5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
