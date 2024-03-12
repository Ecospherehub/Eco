function showPopup(message, symbol) {
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';

    const popup = document.createElement('div');
    popup.className = 'popup';

    const symbolIcon = document.createElement('div');
    symbolIcon.className = 'symbol';
    symbolIcon.innerHTML = symbol;

    const popupText = document.createElement('div');
    popupText.className = 'popup-text';
    popupText.textContent = message;

    popup.appendChild(symbolIcon);
    popup.appendChild(popupText);
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);

    setTimeout(() => {
        popupContainer.remove();
    }, 3000);
}

function loginUser() {
    // Check if reCAPTCHA is filled
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('Please fill the reCAPTCHA to login.');
        return false; // Prevent form submission
    }

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    if (!username.trim() || !password.trim()) {
        showPopup('Please enter valid username and password.', '❌');
        return false; 
    }

    const registeredData = JSON.parse(localStorage.getItem('registeredData')) ||    
    [];

    const user = registeredData.find(entry => entry.username === username && 
    entry.password === password);

    if (user) {
        showPopup('Login successful!', '✅');
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 3000);
    } else {
        showPopup('Login failed. Please check your credentials and try again.', '❌');
    }

    return false; 
}




function registerUser() {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const regUsername = document.getElementById('regUsername').value;
    const regPasswordInput = document.getElementById('regPassword');
    const regPassword = regPasswordInput.value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsChecked = document.getElementById('terms').checked;

    const mobileRegex = /^[6-9]\d{9}$/; 
    const validMobile = mobileRegex.test(mobile);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const validEmail = emailRegex.test(email);

    if (!name || !validMobile || !validEmail || !age || !regUsername || !regPassword || !confirmPassword || !termsChecked) {
        showPopup('Please fill all details correctly.', '❌');
        return;
    }

    if (regPassword !== confirmPassword) {
        showPopup('Passwords do not match.', '❌');
        return;
    }

    const registeredData = JSON.parse(localStorage.getItem('registeredData')) || [];

    if (registeredData.some(entry => entry.username === regUsername)) {
        showPopup('Username is already taken. Please choose a different one.', '❌');
        return;
    }

    const newUser = {
        name,
        mobile,
        email,
        age,
        username: regUsername,
        password: regPassword
    };

    registeredData.push(newUser);
    localStorage.setItem('registeredData', JSON.stringify(registeredData));

    showPopup('Registration successful! You can now log in.', '✅');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

function togglePasswordVisibility() {
    const regPasswordInput = document.getElementById('regPassword');
    regPasswordInput.type = regPasswordInput.type === 'password' ? 'text' : 'password';
}
// ... (unchanged functions)

function validateMobile() {
    const mobileInput = document.getElementById('mobile');
    const mobileLabel = document.getElementById('mobileLabel');
    const mobileRegex = /^[6-9]\d{9}$/;

    if (mobileRegex.test(mobileInput.value)) {
        mobileLabel.style.color = 'black'; 
    } else {
        mobileLabel.style.color = 'red'; 
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailLabel = document.getElementById('emailLabel');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput.value)) {
        emailLabel.style.color = 'black'; 
    } else {
        emailLabel.style.color = 'red'; 
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('regPassword');
    const passwordLabel = document.getElementById('passwordLabel');
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(passwordInput.value)) {
        passwordLabel.style.color = 'black'; 
    } else {
        passwordLabel.style.color = 'red'; 
    }
}

function togglePasswordVisibility(passwordFieldId) {
    const passwordField = document.getElementById(passwordFieldId);
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}