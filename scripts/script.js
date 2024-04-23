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

// Hide Game
document.getElementById('game').style.display = 'none';

// Simulate User Authentication
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Test User
document.addEventListener('DOMContentLoaded', function () {
    initializeTestUser();
});

function initializeTestUser() {
    // Credentials
    var testUser = {
        username: 'Test',
        email: 'Test',
        password: 'Test'
    };


    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([testUser]));
    } else {
        var users = JSON.parse(localStorage.getItem('users'));

        var exists = users.some(user => user.email === testUser.email);
        if (!exists) {
            users.push(testUser);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

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
    var logoutSuccess = document.getElementById('logout-success');

    game.style.display = 'none'; // Hide Game
    logoutSuccess.style.display = 'none';

    // Check IF Empty
    if (!email || !password) {
        errorLogin.textContent = 'Empty Field(s)';
        return false;
    }

    // Clear Error(s)
    errorLogin.textContent = '';
    loginSuccess.textContent = '';

    // Check Credentials
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(user => user.email === email && user.password === password);

    if (user) {
        loginSuccess.textContent = 'Login Successful';
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        updateUsernameDisplay();
        // Delay
        setTimeout(function () {
            logoutButton.style.display = 'block'; // Show Logout Button
            userNameDisplay.textContent = `Hello, ${user.username}`; // Show Username
            userNameDisplay.style.display = 'block';
            game.style.display = 'flex';
            container.style.display = 'none';
            updateUsernameDisplay();
            updateGameUsername();
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
    var users = JSON.parse(localStorage.getItem('users'));
    var newUser = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

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
    if (username.length < 3 || username.length > 10 || /^\d/.test(username) || /\s/.test(username) || /[^a-zA-Z0-9]/.test(username)) {
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
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    performLogin(newUser.email, newUser.password);
    registerSuccess.textContent = 'Registration Successful';
    clear();
    performLogin(newUser.email, newUser.password);

    return false;
}

// Store User Progress
function storeUserProgress(userId, progressData) {
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(user => user.id === userId);
    user.progress = progressData;
    localStorage.setItem('users', JSON.stringify(users));
}

// Load User Progress
function loadUserProgress(userId) {
    var users = JSON.parse(localStorage.getItem('users'));
    var user = users.find(user => user.id === userId);
    return user.progress;
}

// Perform Login
function performLogin(email, password) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
    login({ preventDefault: () => { } });
}

// Logout Function
function logout() {
    document.getElementById('logout-success').style.display = 'block'; // Show

    var logoutSuccess = document.getElementById('logout-success');
    var loginSuccess = document.getElementById('login-success');
    var registerSuccess = document.getElementById('register-success');
    var logoutButton = document.getElementById('logout');
    var userNameDisplay = document.getElementById('user-name');
    var container = document.getElementById('container');
    var game = document.getElementById('game');
    var opacity = document.getElementById('opacity');

    logoutSuccess.style.display = 'block';
    logoutSuccess.textContent = 'Logout Successful';
    loginSuccess.textContent = '';
    registerSuccess.textContent = '';

    // Reset Login Status
    setTimeout(function () {
        logoutButton.style.display = 'none'; // Hide Logout Button
        userNameDisplay.style.display = 'none'; // Hide Username
        container.style.display = 'flex'; // Show Container
        game.style.display = 'none'; // Hide Game
        document.querySelector('.logout-container').style.display = 'none'; // Hide Logout
        opacity.style.display = 'none';
        clear();
        view();
    }, 1000);

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

    sessionStorage.removeItem('currentUser');
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

// Reset View
function view() {
    var container = document.getElementById('container');
    if (container.style.transform.includes("180deg")) {
        container.style.transform = "translateX(0%) rotateY(0deg)";
    }

    clear();
}

// News "Popup"
function news() {
    var popup = document.getElementById('news-container');
    popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
    if (popup.style.display === 'flex') {
        document.addEventListener('click', close, true);
    }
}

// Close News "Popup" 
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

// Clear ALL Storage
function clearAllStorage() {

    document.getElementById('delete-success').style.display = 'block'; // Show

    // Clear Local Storage
    localStorage.clear();

    // Clear Session Storage
    sessionStorage.clear();

    // Clear Cookies
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.trim().split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    });

    // Hide Logout
    setTimeout(function () {
        document.querySelector('.logout-container').style.display = 'none'; // Hide the logout container
    }, 1000);
    logout();
    clear();
}

function forwards() {
    var flip = document.getElementById('logout-container');
    if (!flip.style.transform.includes("180deg")) {
        flip.style.transform = "rotateY(180deg)";
    }
}

function backwards() {
    var flip = document.getElementById('logout-container');
    if (flip.style.transform.includes("180deg")) {
        flip.style.transform = "rotateY(0deg)";
    }
}

function logoutContainer() {
    var popup = document.getElementById('logout-container');
    var header = document.querySelector('.header');

    if (popup.style.display === 'none') {
        popup.style.display = 'flex';
        popup.classList.add('active');
        header.style.pointerEvents = 'none';
        document.addEventListener('click', closeLogout, true);
    } else {
        closeLogout();
    }
}

function logoutContainer() {
    var opacity = document.getElementById('opacity');
    var logoutContainer = document.getElementById('logout-container');
    var header = document.querySelector('.header');

    if (logoutContainer.style.display === 'none') {
        opacity.style.display = 'flex';
        logoutContainer.style.display = 'flex';
        header.style.pointerEvents = 'none';
        displayAllUsers();
        document.addEventListener('click', closeLogout, true);
    } else {
        closeLogout();
    }
}

function closeLogout(event) {
    var opacity = document.getElementById('opacity');
    var logoutContainer = document.getElementById('logout-container');
    var header = document.querySelector('.header');
    var flip = document.getElementById('logout-container');


    if (event) {
        var popupContentLogout = document.querySelector('.logout-content');
        var popupContentDelete = document.querySelector('.delete-content');
        if (!popupContentLogout.contains(event.target) && !popupContentDelete.contains(event.target)) {
            opacity.style.display = 'none';
            logoutContainer.style.display = 'none';
            header.style.pointerEvents = 'auto';
            flip.style.transform = "rotateY(0deg)";
            document.removeEventListener('click', closeLogout, true);
        }
    } else {
        opacity.style.display = 'none';
        logoutContainer.style.display = 'none';
        header.style.pointerEvents = 'auto';
        flip.style.transform = "rotateY(0deg)";
        document.removeEventListener('click', closeLogout, true);
    }
}

function updateUsernameDisplay() {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.username) {
        var userGreetingSpans = document.querySelectorAll('#user-greeting');
        userGreetingSpans.forEach(span => {
            span.textContent = `Bye, ${currentUser.username}`;
        });
        var userNameDisplays = document.querySelectorAll('#user-name, .user-name-game'); // Update all relevant username displays
        userNameDisplays.forEach(display => {
            display.textContent = `Hello, ${currentUser.username}`;
            document.getElementById('user-coins').textContent = currentUser.coins || 0;
        });
    }
}

function displayAllUsers() {
    var allUsersContainer = document.getElementById('all-users');
    var users = JSON.parse(localStorage.getItem('users'));
    if (users && users.length > 0) {
        var usernames = users.map(user => user.username);
        var formattedUsernames = '';
        if (usernames.length > 1) {

            formattedUsernames = usernames.slice(0, -1).join(', ') + ' & ' + usernames[usernames.length - 1];
        } else {

            formattedUsernames = usernames[0];
        }
        allUsersContainer.textContent = 'Bye, ' + formattedUsernames;
    } else {
        allUsersContainer.textContent = 'NO User(s)';
    }
}

/* Rock Papper Scissors */
let playerScore = 0;
let cpuScore = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.choice').forEach((button) => {
        button.addEventListener('click', function () {
            const playerChoice = this.id;
            const cpuChoice = getCpuChoice();
            const result = determineWinner(playerChoice, cpuChoice);
            updateScore(result);
            if (playerScore === 3 || cpuScore === 3) {
                endGame();
            }
        });
    });
    initializeReplayButton();
});

function getCpuChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function determineWinner(player, cpu) {
    if (player === cpu) {
        return 'draw';
    } else if (
        (player === 'rock' && cpu === 'scissors') ||
        (player === 'paper' && cpu === 'rock') ||
        (player === 'scissors' && cpu === 'paper')
    ) {
        return 'player';
    } else {
        return 'cpu';
    }
}

function updateScore(result) {
    const playerScoreSpan = document.getElementById('player-score');
    const cpuScoreSpan = document.getElementById('cpu-score');
    const resultText = document.getElementById('result');

    if (result === 'player') {
        playerScore++;
        resultText.textContent = 'Win';
        resultText.className = 'result-text result-win';
    } else if (result === 'cpu') {
        cpuScore++;
        resultText.textContent = 'Loss';
        resultText.className = 'result-text result-loss';
    } else {
        resultText.textContent = 'Draw';
        resultText.className = 'result-text result-draw';
    }

    playerScoreSpan.textContent = playerScore;
    cpuScoreSpan.textContent = cpuScore;
}

function endGame() {
    const resultText = document.getElementById('result');
    const choices = document.querySelectorAll('.choice');

    choices.forEach(button => button.disabled = true);

    if (playerScore === 3) {
        resultText.textContent = 'Username Wins';
        resultText.className = 'result-text result-win';
        updateCoins(1);
    } else {
        resultText.textContent = 'Computer Wins';
        resultText.className = 'result-text result-loss';
    }
    document.getElementById('replay').style.display = 'block';
}

function handleReplayClick(event) {
    event.preventDefault();
    event.stopPropagation();
    resetGame();
}

function resetGame() {
    playerScore = 0;
    cpuScore = 0;
    updateScoreDisplay();
    resetGameInterface();
}

function updateScoreDisplay() {
    const resultText = document.getElementById('result');
    document.getElementById('player-score').textContent = '0';
    document.getElementById('cpu-score').textContent = '0';
    resultText.textContent = 'Choose';
    resultText.className = 'result-text';
}

function resetGameInterface() {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(button => button.disabled = false);
    document.getElementById('replay').style.display = 'none';
}

function initializeReplayButton() {
    const replayButton = document.getElementById('replay');
    replayButton.removeEventListener('click', handleReplayClick);
    replayButton.addEventListener('click', handleReplayClick, true);
}

function updateGameUsername() {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.username) {
        var gameUsernameDisplay = document.querySelector('.user-name-game');
        if (gameUsernameDisplay) {
            gameUsernameDisplay.textContent = currentUser.username;
        }
    }
}

function showGame() {
    var gameElement = document.getElementById('game');
    gameElement.style.display = 'flex';
    updateGameUsername();
}

document.addEventListener('DOMContentLoaded', function () {
    const openRpsButton = document.getElementById('open-rps');
    const rpsOverlay = document.getElementById('rps-overlay');
    const rpsContainer = document.getElementById('rps-container');

    openRpsButton.addEventListener('click', function () {
        rpsOverlay.style.display = 'flex';
    });

    rpsOverlay.addEventListener('click', function (event) {
        if (event.target === rpsOverlay) {
            rpsOverlay.style.display = 'none';
            resetGame();
        }
    });

    rpsContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

function updateCoins(amount) {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser.coins) currentUser.coins = 0;
    currentUser.coins += amount;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    document.getElementById('user-coins').textContent = currentUser.coins;
    saveUserProgress(currentUser);
}

function saveUserProgress(user) {
    var users = JSON.parse(localStorage.getItem('users'));
    var userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}
