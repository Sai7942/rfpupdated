const firebaseConfig = {
    apiKey: "AIzaSyB-IQMg-vVM4APyiKK6_9UPy6YMqFYT1ak",
    authDomain: "travel-1a39d.firebaseapp.com",
    databaseURL: "https://travel-1a39d-default-rtdb.firebaseio.com",
    projectId: "travel-1a39d",
    storageBucket: "travel-1a39d.appspot.com",
    messagingSenderId: "979726929683",
    appId: "1:979726929683:web:9f2061a315d76e533dd4e6",
    measurementId: "G-XDLDYH35ZY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref("signup-container-shadow");

document.getElementById("signup-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var username = getElementVal("username");
    var email = getElementVal("email");
    var password = getElementVal("password");
    var password2 = getElementVal("password2");

    if (password !== password2) {
        alert("Passwords do not match");
        return;
    }

    saveMessages(username, email, password);

    // Enable alert
    document.querySelector(".alert").style.display = "block";

    // Remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Reset the form
    document.getElementById("signup-form").reset();
}

const saveMessages = (username, email, password) => {
    var newContactForm = contactFormDB.push();

    newContactForm.set({
        username: username,
        email: email,
        password: password
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
