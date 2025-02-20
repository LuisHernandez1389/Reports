// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDoGg5aB-2FlxZ1oC_ERhmMgl8kXGNqE0",
  authDomain: "information-all-e540a.firebaseapp.com",
  databaseURL: "https://information-all-e540a-default-rtdb.firebaseio.com",
  projectId: "information-all-e540a",
  storageBucket: "information-all-e540a.appspot.com",
  messagingSenderId: "765636388340",
  appId: "1:765636388340:web:f99dfd4d60ff68522d85a1",
  measurementId: "G-727TZ6DX5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: remove if not using Firebase Analytics

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

// Get a reference to the database service
const database = getDatabase(app);

// Export the necessary modules
export { app, storage, database, analytics };
