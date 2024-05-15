// Dummy data for post feed
let posts = [
    { id: 1, type: 'post', imageUrl: 'https://plus.unsplash.com/premium_photo-1663951252608-ab1fdec72fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D', likes: 10, comments: [] },
    { id: 2, type: 'story', imageUrl: 'https://images.unsplash.com/photo-1532509854226-a2d9d8e66f8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D', likes: 20, comments: [] },
    { id: 3, type: 'post', imageUrl: 'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D', likes: 15, comments: [] }
];

// Function to render posts
function renderPosts() {
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="${post.type}" onclick="toggleLike(${post.id})" ondblclick="doubleClickLike(${post.id})">
            <div class="actions">
                <button class="like" onclick="toggleLike(${post.id})">
                    <img class="like-icon" src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="Like">
                    <span>${post.likes}</span>
                </button>
                <button class="comment" onclick="openCommentModal(${post.id})">
                    <img src="https://cdn-icons-png.flaticon.com/128/3416/3416046.png "width="20px"height="20px" alt="Comment">
                    <span>${post.comments.length}</span>
                </button>
            </div>
            <div class="comments-container" id="comments_${post.id}">
                ${post.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
            </div>
        `;

        postContainer.appendChild(postElement);
    });
}

// Function to open upload modal
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

// Function to close upload modal
function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

// Function to upload story
function uploadStory() {
    closeUploadModal();
    // Simulate upload delay with loading animation
    const uploadingPopup = document.createElement('div');
    uploadingPopup.classList.add('uploading-popup');
    uploadingPopup.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Your story is uploading...</p>
    `;
    document.body.appendChild(uploadingPopup);

    // Simulate delay before showing upload success message
    setTimeout(() => {
        uploadingPopup.innerHTML = `
            <div class="upload-success">
                <img src="tick.svg" alt="Success">
                <p>Story uploaded successfully!</p>
            </div>
        `;
        // Automatically close popup after 5 seconds
        setTimeout(() => {
            uploadingPopup.remove();
        }, 5000);
    }, 8000);
}

// Function to upload post// Function to upload post
function uploadPost() {
    closeUploadModal();
    // Simulate upload delay with loading animation
    const uploadingPopup = document.createElement('div');
    uploadingPopup.classList.add('uploading-popup');
    uploadingPopup.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Your post is uploading...</p>
    `;
    document.body.appendChild(uploadingPopup);

    // Simulate delay before showing upload success message
    setTimeout(() => {
        uploadingPopup.innerHTML = `
            <div class="upload-success">
                <img src="tick.svg" alt="Success">
                <p>Post uploaded successfully!</p>
            </div>
        `;
        // Automatically close popup after 5 seconds
        setTimeout(() => {
            uploadingPopup.remove();
        }, 5000);

        // Add the uploaded post to the feed
        const fileUpload = document.getElementById('fileUpload');
        if (fileUpload.files.length > 0) {
            const imageUrl = URL.createObjectURL(fileUpload.files[0]);
            const newPost = { id: Date.now(), type: 'post', imageUrl: imageUrl, likes: 0, comments: [] };
            posts.unshift(newPost); // Add the new post to the beginning of the array
            renderPosts(); // Render the updated feed
        }
    }, 8000);
}


// Function to open comment modal
function openCommentModal(postId) {
    const commentModal = document.getElementById('commentModal');
    commentModal.style.display = 'block';
    commentModal.dataset.postId = postId;
}

// Function to close comment modal
function closeCommentModal() {
    document.getElementById('commentModal').style.display = 'none';
}

// Function to submit comment
function submitComment() {
    const postId = document.getElementById('commentModal').dataset.postId;
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    if (comment !== '') {
        const post = posts.find(post => post.id == postId);
        if (post) {
            post.comments.push(comment);
            renderPosts();
            closeCommentModal();
        }
    }
}

// Function to toggle like for a post
function toggleLike(postId) {
    const post = posts.find(post => post.id === postId);
    if (!post) return;

    post.likes += post.liked ? -1 : 1;
    post.liked = !post.liked;

    renderPosts();
}

// Function to handle double-click like for a post
function doubleClickLike(postId) {
    const post = posts.find(post => post.id === postId);
    if (!post) return;

    post.likes += 1;
    renderPosts();

    // Show heart popup for 3 seconds
    const heartPopup = document.createElement('div');
    heartPopup.classList.add('heart-popup');
    heartPopup.innerHTML = '&hearts;';
    document.body.appendChild(heartPopup);
    setTimeout(() => {
        heartPopup.remove();
    }, 3000);
}

// Load user profile data from local storage
function loadUserProfile() {
    const userData = JSON.parse(localStorage.getItem('registeredData'));
    if (userData) {
        document.getElementById('username').innerText = userData.username;
        document.getElementById('name').innerText = userData.name;
        document.getElementById('age').innerText = userData.age;
        document.getElementById('email').innerText = userData.email;
    }
}


// Dummy data for story feed
let stories = [
    { id: 1, storyUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, storyUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, storyUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
];

// Function to render stories
function renderStories() {
    const storyContainer = document.getElementById('storyContainer');
    storyContainer.innerHTML = '';

    stories.forEach(story => {
        const storyElement = document.createElement('div');
        storyElement.classList.add('story');
        storyElement.innerHTML = `<img src="${story.storyUrl}" alt="Story" onclick="playStory(${story.id})">`;
        storyContainer.appendChild(storyElement);
    });
}

// Function to upload story
function uploadStory() {
    closeUploadModal();
    // Simulate upload delay with loading animation
    const uploadingPopup = document.createElement('div');
    uploadingPopup.classList.add('uploading-popup');
    uploadingPopup.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Your story is uploading...</p>
    `;
    document.body.appendChild(uploadingPopup);

    // Simulate delay before showing upload success message
    setTimeout(() => {
        uploadingPopup.innerHTML = `
            <div class="upload-success">
                <img src="tick.svg" alt="Success">
                <p>Story uploaded successfully!</p>
            </div>
        `;
        // Automatically close popup after 5 seconds
        setTimeout(() => {
            uploadingPopup.remove();
        }, 5000);

        // Add the uploaded story to the top of the story container
        const fileUpload = document.getElementById('fileUpload');
        if (fileUpload.files.length > 0) {
            const storyUrl = URL.createObjectURL(fileUpload.files[0]);
            const newStory = { id: Date.now(), storyUrl: storyUrl };
            stories.unshift(newStory); // Add the new story to the beginning of the array
            renderStories(); // Render the updated stories
        }
    }, 8000);
}

// Function to play story
// Function to play story
function playStory(storyId) {
    const story = stories.find(story => story.id === storyId);
    if (!story) return;

    const storyImageUrl = story.storyUrl;

    // Show the story modal
    const modal = document.getElementById('storyModal');
    const modalImage = document.getElementById('modalStoryImage');
    modalImage.src = storyImageUrl;
    modal.style.display = 'block';

    // Progress bar
    const progressBar = document.getElementById('storyProgressBar');
    let width = 0;
    const interval = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += 0.5;
            progressBar.style.width = width + '%';
        }
    }

    // Close the modal after 15 seconds
    setTimeout(() => {
        clearInterval(interval);
        closeStoryModal();
    }, 15000);
}

// Function to close story modal
function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    modal.style.display = 'none';
    const progressBar = document.getElementById('storyProgressBar');
    progressBar.style.width = '0';
}


// Initial rendering of posts and loading user profile
renderPosts();
loadUserProfile();


// Function to load data from server
