<script>
	import { onMount } from 'svelte';

	let typedText = '';
	let showCursor = true;

	const phrases = [
		'Clojure Developer.',
		'Data Engineer.',
		'AI / ML Engineer.',
		'Functional Programmer.',
	];

	let phraseIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let visible = false;

	onMount(() => {
		visible = true;

		// Cursor blink
		const cursorInterval = setInterval(() => {
			showCursor = !showCursor;
		}, 530);

		// Typing effect
		function typeLoop() {
			const currentPhrase = phrases[phraseIndex];

			if (!isDeleting && charIndex <= currentPhrase.length) {
				typedText = currentPhrase.slice(0, charIndex++);
				setTimeout(typeLoop, 70);
			} else if (isDeleting && charIndex >= 0) {
				typedText = currentPhrase.slice(0, charIndex--);
				setTimeout(typeLoop, 40);
			} else if (!isDeleting && charIndex > currentPhrase.length) {
				isDeleting = true;
				setTimeout(typeLoop, 1600);
			} else {
				isDeleting = false;
				phraseIndex = (phraseIndex + 1) % phrases.length;
				charIndex = 0;
				setTimeout(typeLoop, 300);
			}
		}

		setTimeout(typeLoop, 800);

		return () => clearInterval(cursorInterval);
	});
</script>

<section id="hero" class:visible>
	<div class="container">
		<div class="tag mono">
			<span class="dot"></span> Available for new opportunities
		</div>

		<h1>
			Hello, I'm<br />
			<span class="name">Joseph Avila</span>
		</h1>

		<div class="typewriter mono">
			<span>{typedText}</span><span class="cursor" class:hidden={!showCursor}>_</span>
		</div>

		<p class="bio">
			Building reliable systems with <strong>Clojure</strong>, extracting value from data with
			<strong>Python</strong>, and crafting intelligent solutions at the intersection of
			software engineering and machine learning.
		</p>

		<div class="cta-row">
			<a href="#contact" class="btn-primary">
				Get in touch <span class="arrow">→</span>
			</a>
			<a href="https://github.com/josephinoo" target="_blank" rel="noopener" class="btn-ghost">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				josephinoo
			</a>
		</div>

		<div class="scroll-hint mono">
			scroll <span>↓</span>
		</div>
	</div>
</section>

<style>
	#hero {
		display: flex;
		align-items: center;
		padding: 140px 24px 80px;
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}

	#hero.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
		width: 100%;
		padding-top: 80px;
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-secondary);
		border: 1px solid var(--border);
		padding: 6px 14px;
		border-radius: 100px;
		margin-bottom: 32px;
		animation: fadeIn 0.6s ease 0.3s both;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.3; }
	}

	h1 {
		font-family: var(--font-mono);
		font-size: clamp(2.4rem, 7vw, 4.2rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.04em;
		margin-bottom: 20px;
		color: var(--text-primary);
		animation: fadeIn 0.6s ease 0.4s both;
	}

	.name {
		background: linear-gradient(135deg, #fff 0%, #aaa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.typewriter {
		font-size: clamp(1rem, 3vw, 1.4rem);
		color: var(--accent);
		margin-bottom: 28px;
		min-height: 2em;
		animation: fadeIn 0.6s ease 0.5s both;
	}

	.cursor {
		opacity: 1;
		transition: opacity 0.1s;
	}
	.cursor.hidden { opacity: 0; }

	.bio {
		font-size: 1.05rem;
		color: var(--text-secondary);
		max-width: 560px;
		line-height: 1.8;
		margin-bottom: 40px;
		animation: fadeIn 0.6s ease 0.6s both;
	}

	.bio strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.cta-row {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		animation: fadeIn 0.6s ease 0.7s both;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: var(--accent);
		color: #fff;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 12px 24px;
		border-radius: 4px;
		transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
	}

	.btn-primary:hover {
		background: #ff1a1a;
		color: #fff;
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(255, 51, 51, 0.3);
	}

	.arrow {
		transition: transform 0.2s;
	}

	.btn-primary:hover .arrow {
		transform: translateX(3px);
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		border: 1px solid var(--border);
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: 0.82rem;
		letter-spacing: 0.04em;
		padding: 12px 20px;
		border-radius: 4px;
		transition: border-color var(--transition), color var(--transition), background var(--transition);
	}

	.btn-ghost:hover {
		border-color: var(--border-hover);
		color: var(--text-primary);
		background: var(--bg-card);
	}

	.scroll-hint {
		margin-top: 40px;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		gap: 8px;
		animation: fadeIn 0.6s ease 1s both;
	}

	.scroll-hint span {
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(4px); }
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(12px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
