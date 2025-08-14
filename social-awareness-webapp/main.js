// =================================================================
// SỰ KIỆN CHÍNH: Chạy khi toàn bộ trang HTML đã được tải xong
// =================================================================
window.addEventListener('DOMContentLoaded', () => {
    // Gán các sự kiện click cho các nút
    document.getElementById('register-btn').addEventListener('click', registerUser);
    document.getElementById('login-btn').addEventListener('click', loginUser);
    document.getElementById('logout-btn').addEventListener('click', logoutUser);

    // Kiểm tra trạng thái đăng nhập ngay khi tải trang
    checkLoginState();
});


// =================================================================
// CÁC HÀM XỬ LÝ LOGIC
// =================================================================

/**
 * Gửi yêu cầu đăng ký người dùng mới đến backend.
 */
async function registerUser() {
    // Lấy đúng dữ liệu từ form ĐĂNG KÝ
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!username || !email || !password) {
        alert('Please fill in all registration fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const result = await response.json();
        alert(result.message); // Hiển thị thông báo từ server

        if (response.ok) {
            // Có thể tự động chuyển người dùng đến form đăng nhập
            document.getElementById('regUsername').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';
        }
    } catch (error) {
        console.error('Registration failed:', error);
        alert('An error occurred during registration.');
    }
    const response = await fetch('http://localhost:3000/register');
}

/**
 * Gửi yêu cầu đăng nhập đến backend.
 */
async function loginUser() {
    // Lấy dữ liệu từ form ĐĂNG NHẬP
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    try {
        // Lưu ý: Bạn cần tạo endpoint '/login' ở backend để xử lý việc này
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            // Đăng nhập thành công, lưu trạng thái vào localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', result.username); // Giả sử backend trả về username
            
            checkLoginState(); // Cập nhật lại giao diện
        } else {
            alert(`Login failed: ${result.message}`);
        }
    } catch (error) {
        console.error('Login request failed:', error);
        alert('An error occurred during login.');
    }
    const response = await fetch('http://localhost:3000/login');
}

/**
 * Xử lý việc đăng xuất.
 */
function logoutUser() {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');

    alert("You have been logged out.");

    // Cập nhật lại giao diện
    checkLoginState();
}


// =================================================================
// CÁC HÀM QUẢN LÝ GIAO DIỆN (UI)
// =================================================================

/**
 * Kiểm tra localStorage và cập nhật giao diện cho phù hợp.
 */
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('loggedInUser');

    const registerSection = document.getElementById('registerSection');
    const loginSection = document.getElementById('loginSection');
    const welcomeSection = document.getElementById('welcomeSection');
    
    if (isLoggedIn === 'true' && username) {
        // Nếu đã đăng nhập: Ẩn form, hiện lời chào
        registerSection.style.display = 'none';
        loginSection.style.display = 'none';
        welcomeSection.style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Welcome back, ${username}!`;
    } else {
        // Nếu chưa đăng nhập: Hiện form, ẩn lời chào
        registerSection.style.display = 'block';
        loginSection.style.display = 'block';
        welcomeSection.style.display = 'none';
    }
}