document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
});

async function fetchPosts() {
  try {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

function renderPosts(posts) {
  const postsSection = document.getElementById('posts');
  postsSection.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Posted by: ${post.author}</small>
    `;
    postsSection.appendChild(postElement);
  });
}

async function createPost() {
  const titleInput = document.getElementById('post-title');
  const contentInput = document.getElementById('post-content');
  const authorInput = document.getElementById('post-author');

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const author = authorInput.value.trim();

  if (title && content && author) {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
      });
      const newPost = await response.json();
      renderNewPost(newPost);
      titleInput.value = '';
      contentInput.value = '';
      authorInput.value = '';
    } catch (error) {
      console.error('Error creating post:', error);
    }
  } else {
    alert('Please enter title, content, and your name for the post.');
  }
}

function renderNewPost(post) {
  const postsSection = document.getElementById('posts');
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
    <small>Posted by: ${post.author}</small>
  `;
  postsSection.prepend(postElement);
}
