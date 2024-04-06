// scripts.js

// Function to populate user profile information
function populateProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = ''; // Clear previous content

        const usernameElement = document.createElement('p');
        usernameElement.textContent = 'Username: ' + currentUser.username;

        const nameElement = document.createElement('p');
        nameElement.textContent = 'Name: ' + currentUser.name;

        const mobileElement = document.createElement('p');
        mobileElement.textContent = 'Mobile Number: ' + currentUser.mobile;

        const emailElement = document.createElement('p');
        emailElement.textContent = 'Email: ' + currentUser.email;

        const ageElement = document.createElement('p');
        ageElement.textContent = 'Age: ' + currentUser.age;

        profileInfo.appendChild(usernameElement);
        profileInfo.appendChild(nameElement);
        profileInfo.appendChild(mobileElement);
        profileInfo.appendChild(emailElement);
        profileInfo.appendChild(ageElement);
    } else {
        console.log('No user logged in.');
    }
}

function updatePassword() {
    console.log("Update password button clicked."); // Debugging
    const modal = document.getElementById('updatePasswordModal');
    modal.style.display = 'block';

    const updateButton = document.getElementById('updateButton');
    updateButton.onclick = function() {
        console.log("Update button clicked."); // Debugging
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser); // Debugging
        const currentPassword = document.getElementById('currentPassword').value;
        console.log("Current Password entered:", currentPassword); // Debugging
        const newPassword = document.getElementById('newPassword').value;
        console.log("New Password entered:", newPassword); // Debugging

        // Check if current password matches
        if (currentUser.password === currentPassword) {
            console.log("Current password is correct."); // Debugging
            // Update password
            currentUser.password = newPassword;
            console.log("Updated currentUser object:", currentUser); // Debugging
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log("Password updated successfully!"); // Debugging
            alert('Password updated successfully!');
            closeModal();
        } else {
            console.log("Incorrect current password."); // Debugging
            alert('Incorrect current password. Please try again.');
        }
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function closeModal() {
    const modal = document.getElementById('updatePasswordModal');
    modal.style.display = 'none';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Function to upload and save profile picture
// Function to upload and save profile picture
function uploadProfilePicture(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            const profileData = reader.result;
            localStorage.setItem('profilePicture', profileData);
            alert('Profile picture uploaded successfully!');
            // Additional logic can be added here if needed
        };

        reader.readAsDataURL(file);
    }
}

// Function to display profile picture on the page
function displayProfilePicture(profileData) {
    const profilePictureElement = document.querySelector('.profile-picture');
    profilePictureElement.innerHTML = ''; // Clear previous content

    const imgElement = document.createElement('img');
    imgElement.src = profileData;
    imgElement.alt = 'Profile Picture';

    profilePictureElement.appendChild(imgElement);
}

// Initialization logic
window.onload = function() {
    populateProfile();
    // Additional initialization logic if needed
};
