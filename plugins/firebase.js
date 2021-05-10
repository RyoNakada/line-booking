

import firebase from "firebase"
import 'firebase/auth'

const config = {
    projectId: process.env.FIREBASE_PROJECT_ID
}

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA5ZR-0L0dKGv0-C97nbFLJ3mROI0EtAvQ",
        authDomain: "booking-a1.firebaseapp.com",
        projectId: "booking-a1",
        storageBucket: "booking-a1.appspot.com",
        messagingSenderId: "231212613941",
        appId: "1:231212613941:web:6b9ee0d7766c5d454e8c7c",
        measurementId: "G-KNB12DNM6M"
    })
}
export const authProviders = {

    Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
}

export const auth = firebase.auth()
export default firebase