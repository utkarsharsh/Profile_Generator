import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const api=import.meta.env.VITE_API
const project=import.meta.env.VITE_PROJECT
const firebaseConfig = {
    apiKey: api,
    projectId: project
  };
  
  
  const app = initializeApp(firebaseConfig);
  
  
 export const auth = getAuth(app);