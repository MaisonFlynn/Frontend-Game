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
function initializeTestUser() {
    // Credentials
    var testUser = {
        username: 'Test',
        email: 'Test',
        password: 'Test',
        coins: 1000
    };

    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var existingUser = users.find(user => user.email === testUser.email);

    if (!existingUser) {
        users.push(testUser);
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        existingUser.coins = 1000; // Always 1000 Coins
        localStorage.setItem('users', JSON.stringify(users));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initializeTestUser();
});

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
        updateGameUsername();
        updateUserInfoDisplays();
        // Delay
        setTimeout(function () {
            logoutButton.style.display = 'block'; // Show Logout Button
            userNameDisplay.textContent = `Hello, ${user.username}`; // Show Username
            userNameDisplay.style.display = 'block';
            game.style.display = 'flex';
            container.style.display = 'none';
            applyColorTheme(user.lastColor || 'default');
            updateThemeButtonVisibility();
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
        applyColorTheme('default');
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
    toggleUIOnLogin(false);
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
    displayAllUsers();
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
    var opacity = document.getElementById('opacity');
    var logoutContainer = document.getElementById('logout-container');
    var header = document.querySelector('.header');

    // Fetch current user from session storage
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    var username = currentUser ? currentUser.username : "User"; // Fallback to "User" if no user is logged in

    // Set the username in the logout popup
    document.getElementById('user-greeting').textContent = 'Bye, ' + username;

    if (logoutContainer.style.display === 'none') {
        opacity.style.display = 'flex';
        logoutContainer.style.display = 'flex';
        header.style.pointerEvents = 'none';
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
        userGreetingSpans.forEach(span => span.textContent = currentUser.username);

        var generalUserNameDisplays = document.querySelectorAll('#user-name:not(.user-name-game)');
        generalUserNameDisplays.forEach(display => {
            display.textContent = `Hello, ${currentUser.username}`;
        });
    }
}

function forwards() {
    var flip = document.getElementById('logout-container');
    displayAllUsers();
    if (!flip.style.transform.includes("180deg")) {
        flip.style.transform = "rotateY(180deg)";
    }
}

function displayAllUsers() {
    var allUsersContainer = document.getElementById('all-users');
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users && users.length > 0) {
        var usernames = users.map(user => user.username);
        var formattedUsernames = usernames.length > 1
            ? usernames.slice(0, -1).join(', ') + ' & ' + usernames[usernames.length - 1]
            : usernames[0];
        allUsersContainer.textContent = 'Bye, ' + formattedUsernames;
    } else {
        allUsersContainer.textContent = 'No User(s)';
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
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const username = currentUser ? currentUser.username : 'Player';

    choices.forEach(button => button.disabled = true);

    if (playerScore === 3) {
        resultText.textContent = `${username} Wins`;
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
        var gameUsernameDisplays = document.querySelectorAll('.user-name-game');
        gameUsernameDisplays.forEach(display => {
            display.textContent = currentUser.username;
        });
    }
}

function showGame() {
    var gameElement = document.getElementById('game');
    gameElement.style.display = 'flex';
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
    updateUserInfoDisplays();
}

function saveUserProgress(user) {
    var users = JSON.parse(localStorage.getItem('users'));
    var userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Number Game
function checkNumberGuess() {
    event.preventDefault();
    const guessInput = document.getElementById('number-guess-input');
    const userGuess = parseInt(guessInput.value);
    const feedbackText = document.getElementById('number-guess-feedback');
    const chancesDisplay = document.getElementById('number-guess-chances');

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedbackText.innerText = 'Invalid Input';
        feedbackText.style.color = 'red';
        return false;
    }

    chancesLeft--;
    chancesDisplay.innerText = chancesLeft;

    if (userGuess === secretNumber) {
        feedbackText.innerText = 'Win';
        feedbackText.style.color = 'green';
        updateCoins(1);
        endNumberGame();
    } else if (chancesLeft <= 0) {
        feedbackText.innerText = 'Lose, Number ' + secretNumber;
        feedbackText.style.color = 'red';
        endNumberGame();
    } else {
        feedbackText.innerText = userGuess > secretNumber ? 'Lower' : 'Higher';
        feedbackText.style.color = 'orange';
    }
    return false;
}

function endNumberGame() {
    document.getElementById('number-replay-button').style.display = 'block';
    document.getElementById('number-guess-input').disabled = true;
    document.getElementById('guess-button').disabled = true;
}

function restartNumberGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    chancesLeft = 6;

    const numberInput = document.getElementById('number-guess-input');
    const guessButton = document.getElementById('guess-button');
    const feedbackText = document.getElementById('number-guess-feedback');
    const chancesDisplay = document.getElementById('number-guess-chances');

    chancesDisplay.innerText = chancesLeft;
    feedbackText.innerText = 'Enter Number';
    feedbackText.style.color = 'black';
    numberInput.value = '';
    numberInput.disabled = false;
    guessButton.disabled = false;
    document.getElementById('number-replay-button').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    initializeNumberGame();
});

function initializeNumberGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    chancesLeft = 6;
    document.getElementById('number-guess-chances').innerText = chancesLeft;
}

// Close Guess Number
document.addEventListener('DOMContentLoaded', function () {
    const openNumberGameBtn = document.getElementById('open-number-game');
    const numberGameOverlay = document.getElementById('number-game-overlay');

    openNumberGameBtn.addEventListener('click', function () {
        numberGameOverlay.style.display = numberGameOverlay.style.display === 'none' ? 'flex' : 'none';
    });

    numberGameOverlay.addEventListener('click', function (event) {
        if (event.target === numberGameOverlay) {
            numberGameOverlay.style.display = 'none';
            restartNumberGame();
        }
    });

    initializeNumberGame();
});

/* Theme(s) */
const themes = {
    red: 'red-theme', // Basic(s)
    green: 'green-theme',
    blue: 'blue-theme',
    gold: 'gold-theme', // Secret(s)
    diamond: 'diamond-theme',
    default: 'default-theme' // Default
};

function applyColorTheme(color) {
    const themeClass = themes[color] || themes.default;
    const elementsToColor = document.querySelectorAll('html, body');

    elementsToColor.forEach(elem => {
        Object.values(themes).forEach(theme => {
            elem.classList.remove(theme);
        });

        elem.classList.add(themeClass);
    });

    var currentUser = getCurrentUser();
    if (currentUser) {
        currentUser.lastColor = color;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function changeColor(color, cost) {
    var currentUser = getCurrentUser();

    if (currentUser.coins >= cost) {
        currentUser.coins -= cost;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserInfoDisplays();
        applyColorTheme(color);
        currentUser.lastColor = color;
        saveUserProgress(currentUser);
    }
}

function restoreUserColor() {
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.lastColor) {
        applyColorTheme(currentUser.lastColor);
    } else {
        applyColorTheme('default');
    }
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function updateUserInfoDisplays() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userNameDisplays = document.querySelectorAll('#user-name');
        const gameUserNameDisplays = document.querySelectorAll('.user-name-game');

        userNameDisplays.forEach(display => {
            if (!display.classList.contains('user-name-game')) {
                display.textContent = `Hello, ${currentUser.username}`;
            }
        });

        gameUserNameDisplays.forEach(display => {
            display.textContent = currentUser.username;
        });

        const userCoinsDisplay = document.getElementById('user-coins');
        if (userCoinsDisplay) {
            userCoinsDisplay.textContent = currentUser.coins || 0;
        }

        updateThemeButtonVisibility();
    }
}


/* Secret Theme(s) */
function updateThemeButtonVisibility() {
    const currentUser = getCurrentUser();
    const goldButton = document.getElementById('gold-theme-btn');
    const diamondButton = document.getElementById('diamond-theme-btn');

    if (!currentUser) {
        goldButton.style.display = 'none';
        diamondButton.style.display = 'none';
        return;
    }

    // Coin Limit(s)
    goldButton.style.display = currentUser.coins >= 5 ? 'block' : 'none';
    diamondButton.style.display = currentUser.coins >= 10 ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    updateThemeButtonVisibility();
});

/* Sparkle(s) */
function addStar() {
    var currentUser = getCurrentUser();
    if (currentUser && (currentUser.lastColor === 'gold' || currentUser.lastColor === 'diamond')) {
        var s = document.createElement('div');
        s.className = 'star';
        s.style.setProperty('--size', Math.random() * 10 + 3 + 'vmin');
        s.style.left = Math.floor(Math.random() * 100) + '%';
        s.style.top = Math.floor(Math.random() * 100) + '%';
        s.onanimationend = function () { this.remove(); };
        document.body.appendChild(s);
    } else {
        document.querySelectorAll('.star').forEach(function (star) {
            star.remove();
        });
    }
}

setInterval(addStar, 50);

window.onload = function () {
    logout();
};
