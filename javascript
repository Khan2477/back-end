function loginUser() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const storedUser = localStorage.getItem('registeredUser');
  const storedPass = localStorage.getItem('registeredPass');

  if (username === '' || password === '') {
    alert("Please enter both username and password.");
    return;
  }

  if (username === storedUser && password === storedPass) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loggedInUser', username);

    alert("Welcome!");
    showWelcome(username);
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('loggedInUser');

  // Clear login form
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';

  // Reset UI
  checkLoginState();

  alert("You have been logged out.");
}

function checkLoginState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('loggedInUser');

  if (isLoggedIn === 'true' && username) {
    showWelcome(username);
  } else {
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('welcomeSection').style.display = 'none';
  }
}

function showWelcome(username) {
  document.getElementById('welcomeMessage').innerText = `Welcome back, ${username}!`;
  document.getElementById('registerSection').style.display = 'none';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('welcomeSection').style.display = 'block';
}
