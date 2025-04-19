import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkod-SUwajPmosvEIAF-s6Ou5zqjaNvlo",
    authDomain: "mobile-benchmarking-auth.firebaseapp.com",
    projectId: "mobile-benchmarking-auth",
    storageBucket: "mobile-benchmarking-auth.firebasestorage.app",
    messagingSenderId: "1029056169084",
    appId: "1:1029056169084:web:4bf4e6967db6b5c1ddb5f9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }