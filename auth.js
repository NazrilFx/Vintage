let userData = null
let userDoc = null
const updateProfile = document.getElementById("updateProfile")
const orderModal = document.getElementById("order-modal")

// Listen for auth status changes
auth.onAuthStateChanged(user => {

    const signin = document.getElementById("signinLink")
    const login = document.getElementById("loginLink")
    const logout = document.getElementById("logoutLink")
    const loginRequired = document.getElementById("loginRequired")
    const main = document.getElementById("main")
    const account = document.getElementById("account")
    const userInfo = document.getElementById("user-info")

    if (user) {
        login.style.display = "none"
        signin.style.display = "none"
        logout.style.display = "block"
        loginRequired.style.display = "none"
        main.style.display = "block"
        account.style.display = "block"
    } else if (user === null) {
        login.style.display = "block"
        signin.style.display = "block"
        logout.style.display = "none"
        loginRequired.style.display = "block"
        main.style.display = "none"
        account.style.display = "none"
    }

    if (user) {
        userInfo.innerText = `Logged as ${user.email}`
    }

})

setTimeout(() => {
    const user = firebase.auth().currentUser;
    if (user) {
        console.info("Current User: ", user.email);
    } else {
        console.info("No current user.");
    }

    userData = firebase.firestore().collection("users").doc(user.uid);

    // Mengambil data user sesuai uidnya
    userData.get()
        .then((doc) => {
            if (doc.exists) {
                // console.log("Data pengguna:", doc.data());
                // Lakukan sesuatu dengan data yang diambil
                userDoc = doc.data()
            } else {
                console.log("Dokumen tidak ditemukan");
            }
        })
        .catch((error) => {
            console.error("Error getting document:", error);
        });

}, 2000)

function updateProfileFunction () {
    console.info("test")
}

function submit () {

    const fullname = document.getElementById("fullname").value
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const modal = document.getElementById("modal")

    console.log(email)

    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.info(cred.user.uid)
        db.collection("users").doc(cred.user.uid).set({
            fullname: fullname,
            username: username,
            email: email,
        })
        // modal.style.display = "block"
    })

}

function submitLogin () {

    const email = document.getElementById("emailLogin").value
    const password = document.getElementById("passwordLogin").value

    firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
        console.info("test");
    }).catch((error) => {
        console.error("Error signing in:", error);
    });

    // setTimeout(() => {
    //     window.location.href = "index.html"
    // }, 1000)

}

function logOut () {
    auth.signOut().then(() => {
        console.info("user logout")
    })

    location.reload() // Otomatis reload halaman setelah logout
}

function submitInp() {
    const inp = document.getElementById("inp").value;
    return db.collection("example").doc("user").set({
        examp: inp 
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

setTimeout(() => {
    const app = document.getElementById("app")
    const loading = document.getElementById("loading")

    app.style.display = "block"
    loading.style.display = "none"
}, 1000)
