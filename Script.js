const posts = [
  "Join the tree plantation campaign!",
  "Reduce plastic usage and recycle more.",
  "Support clean energy initiatives.",
  "Participate in local community cleanups.",
  "Spread awareness about sustainable living."
];

let currentPostIndex = 0;

function startFlippingPosts() {
  const flipContainer = document.getElementById('flipPosts');
  flipContainer.innerText = posts[currentPostIndex];
  setInterval(() => {
    currentPostIndex = (currentPostIndex + 1) % posts.length;
    flipContainer.innerText = posts[currentPostIndex];
  }, 3000);
}

// Register user
function registerUser() {
  const username = document.getElementById('regUsername').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  localStorage.setItem(username, password);
  alert("Registration successful! You can now login.");
  document.getElementById('regUsername').value = '';
  document.getElementById('regPassword').value = '';
}

// Login user
function loginUser() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    document.getElementById('welcomeMessage').innerText = `Welcome, ${username}!`;
    alert("Login successful!");
  } else {
    alert("Invalid username or password!");
  }
}

function logoutUser() {
  // Reset welcome message
  document.getElementById('welcomeMessage').innerText = "You are logged out.";
  alert("You have been logged out!");
}
