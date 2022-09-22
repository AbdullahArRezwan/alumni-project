const firebaseConfig = {
    apiKey: "AIzaSyAyNlf_NMX1wnImcxJpXjGBZ7FjkZarDlE",
    authDomain: "alumni-ebeb3.firebaseapp.com",
    projectId: "alumni-ebeb3",
    storageBucket: "alumni-ebeb3.appspot.com",
    messagingSenderId: "864248187654",
    appId: "1:864248187654:web:fddb59984db17727cdac87"
};


//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()


const signUpButton = document.getElementById('signUpButton');

signUpButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked")

    const registerEmail = document.getElementById("inputEmailRegister")
    const registerPassword = document.getElementById("inputPasswordRegister")

    auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value)
        .then((userCredential) => {
            location.reload();
            // Signed in 
            var user = userCredential.user;
            console.log("user", user);
            user.sendEmailVerification();
            alert("Your registration has been completely! A email verification link has been sent to your email");
            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error code", errorCode)
            console.log("error Message", errorMessage);
            alert(errorMessage);
        });
})








let signInButton = document.getElementById('signInButton')
signInButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked")

    const loginEmail = document.getElementById("inputEmailLogin")
    const loginPassword = document.getElementById("inputPasswordLogin")

    auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        .then((userCredential) => {
           
            var user = userCredential.user;
            console.log("user", user);
            if(user.emailVerified){
                window.location = "Home.html";
                alert("Congratulations. Logged In Successfully");
            }
            else {
                alert("Please verify your email first!");
            }



        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // alert("error code", errorCode)
            alert(errorMessage)
        });
})



//Lifecycle hooks
auth.onAuthStateChanged(function (user) {
    if (user) {

        var email = user.email

        var users = document.getElementById("user")
        var text = document.createTextNode(email);

        users.appendChild(text);

        console.log(users)
        //is signed in
    } else {
        //no user signed in
    }
})