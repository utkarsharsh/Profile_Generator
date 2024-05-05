import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBPKmzI_OKTt0ElsCJ2VlWBFjoYsTQaaP8",
    projectId: "tapop-e8824"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  
  // Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);