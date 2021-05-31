import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCkvCNEvBsblhfWRs1O_vcAU7leU3ybhts",
    authDomain: "yt-clone-anirban-nayek21.firebaseapp.com",
    projectId: "yt-clone-anirban-nayek21",
    storageBucket: "yt-clone-anirban-nayek21.appspot.com",
    messagingSenderId: "586273358358",
    appId: "1:586273358358:web:1a0f8a3c0c107065846b37"
};

firebase.initializeApp(firebaseConfig)

export default firebase.auth()