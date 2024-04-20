/* Flip Between Login & Register */
function front() {
    var flip = document.getElementById('container');
    if (!flip.style.transform.includes("180deg")) {
        flip.style.transform = "translateX(-100%) rotateY(180deg)";
    }
}

function back() {
    var flip = document.getElementById('container');
    if (flip.style.transform.includes("180deg")) {
        flip.style.transform = "translateX(0%) rotateY(0deg)";
    }
}

// Users (Simulation)
var users = [
    { email: 'Test', password: 'Test', username: 'Test' }
];

// Hide Game
document.getElementById('game').style.display = 'none';

// Login Function
function login(event) {
    event.preventDefault();

    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var errorLogin = document.getElementById('error-login');
    var loginSuccess = document.getElementById('login-success');
    var logoutButton = document.getElementById('logout');
    var userNameDisplay = document.getElementById('user-name');
    var container = document.getElementById('container');
    var game = document.getElementById('game');

    game.style.display = 'none';

    // Check IF Empty
    if (!email || !password) {
        errorLogin.textContent = 'Empty Field(s)';
        return false;
    }

    // Clear Error(s)
    errorLogin.textContent = '';
    loginSuccess.textContent = '';

    // Check Credentials
    var user = users.find(user => user.email === email && user.password === password);

    if (user) {
        loginSuccess.textContent = 'Login Successful';
        // Delay
        setTimeout(function () {
            logoutButton.style.display = 'block'; // Show Logout Button
            userNameDisplay.textContent = `Hello, ${user.username}`; // Show Username
            userNameDisplay.style.display = 'block';
            game.style.display = 'flex';
            container.style.display = 'none';
            clear();
        }, 1000);
    } else {
        errorLogin.textContent = "Invalid Credential(s)";
        return false;
    }

    return false;
}

// Function TO Fill Login & Submit
function performLogin(email, password) {
    // Set Values IN Login
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;

    // Submit
    var loginButton = document.querySelector('#login-form button.confirm');
    loginButton.click();
}

// Register Function
function register() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var errorUsername = document.getElementById('error-username');
    var errorEmail = document.getElementById('error-email');
    var errorPassword = document.getElementById('error-password');
    var registerSuccess = document.getElementById('register-success');

    // Clear Error(s)
    registerSuccess.textContent = '';
    errorUsername.textContent = '';
    errorEmail.textContent = '';
    errorPassword.textContent = '';

    // Check Existing User
    var existingUsernames = users.map(user => user.username);
    var existingEmails = users.map(user => user.email);

    // Check IF Empty
    if (!username || !email || !password || !confirmPassword) {
        errorPassword.textContent = 'Empty Field(s)';
        return false;
    }

    // Validate Username
    if (username.length < 3 || username.length > 10 || /^\d/.test(username)) {
        errorUsername.textContent = "Invalid Username";
        return false;
    }

    // Validate Username Existance
    if (existingUsernames.includes(username)) {
        errorUsername.textContent = 'Username Exists';
        return false;
    }

    // Validate Email
    if (existingEmails.includes(email)) {
        errorEmail.textContent = 'Email Exists';
        return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errorEmail.textContent = 'Invalid Email';
        return false;
    }

    // Validate Password Strength
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
        errorPassword.textContent = 'Invalid Password';
        return false;
    } else if (password !== confirmPassword) {
        errorPassword.textContent = "Passwords DON'T Match";
        return false;
    }

    // IF Valid Login
    users.push({ email, password, username });
    registerSuccess.textContent = 'Registration Successful';
    clear();
    performLogin(email, password);

    return false;
}

// Perform Login
function performLogin(email, password) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
    login({ preventDefault: () => { } });
}

// Logout Function
function logout() {
    var loginSuccess = document.getElementById('login-success');
    var registerSuccess = document.getElementById('register-success');
    var logoutButton = document.getElementById('logout');
    var userNameDisplay = document.getElementById('user-name');
    var container = document.getElementById('container');
    var game = document.getElementById('game');

    // Reset Login Status
    loginSuccess.textContent = ''; // Clear Message
    if (registerSuccess) registerSuccess.textContent = '';
    logoutButton.style.display = 'none'; // Hide Logout Button
    userNameDisplay.style.display = 'none'; // Hide Username
    container.style.display = 'flex'; // Show Container
    game.style.display = 'none'; // Hide Game

    // Reset Show Password Checkboxes & Password Field Types
    var loginShowPasswordCheckbox = document.getElementById('login-show-password');
    var showPasswordCheckbox = document.getElementById('show-password');
    var loginPasswordInput = document.getElementById('login-password');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm-password');

    loginShowPasswordCheckbox.checked = false;
    showPasswordCheckbox.checked = false;
    loginPasswordInput.type = 'password';
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';

    view();
}

// Clear Form(s) Function
function clear() {
    // Login Fields
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('error-login').textContent = '';

    // Registration Fields
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('error-username').textContent = '';
    document.getElementById('error-email').textContent = '';
    document.getElementById('error-password').textContent = '';
}

function view() {
    var container = document.getElementById('container');
    if (container.style.transform.includes("180deg")) {
        container.style.transform = "translateX(0%) rotateY(0deg)";
    }

    clear();
}

/* News "Popup" */
function news() {
    var popup = document.getElementById('news-container');
    popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
    if (popup.style.display === 'flex') {
        document.addEventListener('click', close, true);
    }
}

/* Close News "Popup" */
function close(event) {
    var popupContent = document.querySelector('.news-content');
    if (!popupContent.contains(event.target)) {
        document.getElementById('news-container').style.display = 'none';
        document.removeEventListener('click', close, true);
    }
}

// Show Password
function togglePasswordVisibility(passwordId, confirmPasswordId) {
    var passwordInput = document.getElementById(passwordId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }

    // Show Confirm Password
    if (confirmPasswordId) {
        var confirmPasswordInput = document.getElementById(confirmPasswordId);
        if (confirmPasswordInput.type === "password") {
            confirmPasswordInput.type = "text";
        } else {
            confirmPasswordInput.type = "password";
        }
    }
}
