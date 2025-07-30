export function renderHome() {
  document.getElementById('app').innerHTML = `
    <h1>Welcome to Social Awareness Platform</h1>
    <nav>
      <a href="#login">Login</a> | <a href="#register">Register</a>
    </nav>
    <section id="campaigns">
      <h2>Featured Campaigns</h2>
      <p>Join campaigns for social causes and support small businesses.</p>
    </section>
  `;
}
