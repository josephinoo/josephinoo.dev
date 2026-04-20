<script>
  let menuOpen = false;
  let scrolled = false;

  import { onMount } from "svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }
</script>

<nav class:scrolled>
  <div class="nav-inner">
    <a href="/" class="logo" on:click={closeMenu}> josephinoo </a>

    <div class="nav-right">
      <ul class="nav-links" class:open={menuOpen}>
        <li><a href="/#about" on:click={closeMenu}>About</a></li>
        <li><a href="/#skills" on:click={closeMenu}>Skills</a></li>
        <li><a href="/#projects" on:click={closeMenu}>Projects</a></li>
        <li><a href="/blog" on:click={closeMenu}>Blog</a></li>
        <li><a href="/#contact" on:click={closeMenu}>Contact</a></li>
      </ul>

      <div class="nav-controls">
        <ThemeToggle />
        <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
          <span class:open={menuOpen}></span>
          <span class:open={menuOpen}></span>
          <span class:open={menuOpen}></span>
        </button>
      </div>
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0 24px;
    transition:
      background 0.3s ease,
      border-bottom 0.3s ease;
    border-bottom: 1px solid transparent;
  }

  nav.scrolled {
    background: var(--bg-primary);
    background-color: color-mix(in srgb, var(--bg-primary), transparent 10%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }

  .nav-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .logo {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    transition: color 0.2s;
  }

  .logo:hover {
    color: var(--text-primary);
  }

  .asterisk {
    color: var(--accent);
    font-size: 1.2rem;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 36px;
  }

  .nav-links a {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-secondary);
    transition: color var(--transition);
    position: relative;
  }

  .nav-links a::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--accent);
    transition: width var(--transition);
  }

  .nav-links a:hover {
    color: var(--text-primary);
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .nav-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--text-primary);
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger span.open:nth-child(1) {
    transform: rotate(45deg) translate(4.5px, 4.5px);
  }
  .hamburger span.open:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger span.open:nth-child(3) {
    transform: rotate(-45deg) translate(4.5px, -4.5px);
  }

  @media (max-width: 600px) {
    .hamburger {
      display: flex;
    }
    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-primary);
      flex-direction: column;
      align-items: center;
      gap: 0;
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .nav-links.open {
      display: flex;
    }
    .nav-links li {
      width: 100%;
      text-align: center;
    }
    .nav-links a {
      display: block;
      padding: 14px;
    }
  }
</style>
