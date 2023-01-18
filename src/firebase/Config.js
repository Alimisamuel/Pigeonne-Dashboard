import { useReducer, useEffect, useState } from "react";
import  firebase from  'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDriBpcOqruk8px32tI6jEhrgxfONMbUBU",
    authDomain: "pigeonne-b737f.firebaseapp.com",
    projectId: "pigeonne-b737f",
    storageBucket: "pigeonne-b737f.appspot.com",
    messagingSenderId: "388491825774",
    appId: "1:388491825774:web:d458a4e933b8951eb54c7f",
    measurementId: "G-4K9FMFP1YF"
  };

firebase. initializeApp(firebaseConfig);

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()

// Timestamp

const timestamp = firebase.firestore.Timestamp

export {projectAuth , projectFirestore, timestamp}



