const API_URL = "http://localhost:3000"; // URL backend

// =============================
// Flipping Posts Demo
// =============================
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

// =============================
// Register User
// =============================
async function registerUser() {
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registration successful!");

      // Lưu thông tin user
      localStorage.setItem("userId", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);

      resetForms();
      updateUI();
    } else {
      alert(data.message || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Error registering user.");
  }
}

// =============================
// Login User
// =============================
async function loginUser() {
  const email = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Login successful!");

      // Lưu thông tin user
      localStorage.setItem("userId", data.id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);

      resetForms();
      updateUI();
    } else {
      alert(data.message || "Invalid credentials.");
    }
  } catch (err) {
    console.error(err);
    alert("Error logging in.");
  }
}

// =============================
// Logout User
// =============================
function logoutUser() {
  localStorage.clear();
  alert("You have been logged out!");
  updateUI();
}

// =============================
// Campaigns
// =============================
async function createCampaign() {
  const title = document.getElementById("campaignTitle").value.trim();
  const description = document.getElementById("campaignDescription").value.trim();
  const userId = localStorage.getItem("userId");

  if (!title || !description) {
    alert("Please enter both title and description.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/campaigns/create`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ title, description, userId })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Campaign created successfully!");
      document.getElementById("campaignTitle").value = "";
      document.getElementById("campaignDescription").value = "";
      fetchCampaigns();
    } else {
      alert(data.message || "Failed to create campaign.");
    }
  } catch (err) {
    console.error(err);
    alert("Error creating campaign.");
  }
}

async function fetchCampaigns() {
  try {
    const res = await fetch(`${API_URL}/campaigns`);
    const campaigns = await res.json();

    const list = document.getElementById("campaigns");
    list.innerHTML = "";

    campaigns.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${c.title}</strong> - ${c.description}<br>
        <em>By: ${c.createdBy?.username || "Unknown"} (${c.createdBy?.role || "user"})</em><br>
        Status: <b>${c.status}</b>
        ${c.status === "pending" && localStorage.getItem("role") === "admin"
          ? `<button onclick="approveCampaign('${c._id}')">Approve</button>`
          : ""}
        <hr>
      `;
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    alert("Error loading campaigns.");
  }
}

async function approveCampaign(id) {
  try {
    const res = await fetch(`${API_URL}/campaigns/approve/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    const data = await res.json();

    if (res.ok) {
      alert("Campaign approved!");
      fetchCampaigns();
    } else {
      alert(data.message || "Failed to approve campaign.");
    }
  } catch (err) {
    console.error(err);
    alert("Error approving campaign.");
  }
}

// =============================
// UI Helpers
// =============================
function resetForms() {
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('regUsername').value = '';
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';
}

function updateUI() {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  if (username) {
    document.getElementById('welcomeMessage').innerText = `Welcome, ${username} (${role})`;
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'none';
    document.getElementById('logoutSection').style.display = 'block';
    document.getElementById('campaignSection').style.display = 'block';
  } else {
    document.getElementById('welcomeMessage').innerText = "Please login or register.";
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('logoutSection').style.display = 'none';
    document.getElementById('campaignSection').style.display = 'none';
  }

  fetchCampaigns();
}

// =============================
// On page load
// =============================
document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  startFlippingPosts();
});
