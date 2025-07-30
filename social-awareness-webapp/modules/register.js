export function renderRegister() {
  document.getElementById('app').innerHTML = `
    <h1>Register</h1>
    <form id="registerForm">
      <label>Name: <input type="text" name="name" required /></label><br />
      <label>Email: <input type="email" name="email" required /></label><br />
      <label>Password: <input type="password" name="password" required /></label><br />
      <button type="submit">Register</button>
    </form>
    <a href="#">Back to Home</a>
  `;
}
