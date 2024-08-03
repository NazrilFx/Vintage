// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKviFDI3GsfCT8-971CUHGrnRM8qAiiec",
    authDomain: "vintage-990.firebaseapp.com",
    projectId: "vintage-990",
    storageBucket: "vintage-990.appspot.com",
    messagingSenderId: "860885352454",
    appId: "1:860885352454:web:ca862285b4e98ebdfb4387"
};

// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);

// Make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Update firestore settings
db.settings({ timestampsInSnapshots: true });

console.log("Firebase initialized successfully");
console.info(storage)