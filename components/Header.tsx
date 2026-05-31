export default function Header() {
  return (
    <header className="site-header">
      <div className="bar">
        <span className="brand">Nandana Pradeep</span>
        <nav className="nav">
          <a href="#projects">projects</a>
          <a href="#skills">skills</a>
          <a href="#timeline">experience</a>
          <a href="#education">education</a>
          <a href="#activity">activity</a>
          <a href="#contact">contact</a>
          <a href="#easter" className="egg" title="easter egg">
            ✦
          </a>
        </nav>
      </div>
    </header>
  );
}
