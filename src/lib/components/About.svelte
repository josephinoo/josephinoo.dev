<script>
	import { onMount } from 'svelte';

	let section;
	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { isVisible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<section id="about" bind:this={section} class:visible={isVisible}>
	<div class="container">
		<div class="section-header">
			<span class="section-label mono">03 — About</span>
			<h2>A bit about me<span class="accent">.</span></h2>
		</div>

		<div class="about-grid">
			<div class="about-text">
				<p>
					I'm <strong>Joseph Avila</strong> (<span class="mono accent">josephinoo</span>),
					a software engineer based in Latin America. I'm deeply passionate about
					functional programming — especially <strong>Clojure</strong> — and applying
					data science & AI to solve real-world problems.
				</p>

				<p>
					I've been exploring the intersection of data engineering and machine learning
					since I started coding, building pipelines, training models, and shipping products
					that turn messy data into meaningful insights.
				</p>

				<p>
					I also enjoy building with Svelte for the web — elegant, reactive, fast.
					Outside of code, you'll find me reading about distributed systems,
					experimenting with new tech, or learning something completely unrelated just for fun.
				</p>

				<div class="divider mono">——————————————</div>

				<div class="meta-grid">
					<div class="meta-block">
						<span class="meta-label mono">Languages</span>
						<ul>
							<li>Spanish (native)</li>
							<li>English (professional)</li>
						</ul>
					</div>
					<div class="meta-block">
						<span class="meta-label mono">Interests</span>
						<ul>
							<li>Functional programming</li>
							<li>LLMs & GenAI</li>
							<li>Data systems</li>
							<li>Open source</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="terminal-block mono">
				<div class="terminal-header">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
					<span class="terminal-title">joseph@dev ~ $</span>
				</div>
				<div class="terminal-body">
					<div class="line"><span class="prompt">$</span> <span class="cmd">whoami</span></div>
					<div class="line output">josephinoo</div>
					<br />
					<div class="line"><span class="prompt">$</span> <span class="cmd">cat about.clj</span></div>
					<div class="line output">{'{'}:name "Joseph Avila"</div>
					<div class="line output"> :role "Clojure Dev"</div>
					<div class="line output"> :focus [:data-science</div>
					<div class="line output hidden-indent">         :ai-engineer</div>
					<div class="line output hidden-indent">         :backend]</div>
					<div class="line output"> :loves [:functional-programming</div>
					<div class="line output hidden-indent">          :open-source</div>
					<div class="line output hidden-indent">          :svelte{'}'}</div>
					<br />
					<div class="line"><span class="prompt">$</span> <span class="blink-cursor">_</span></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#about {
		padding: var(--section-gap) 24px;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	#about.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 52px;
	}

	.section-label {
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		display: block;
		margin-bottom: 12px;
	}

	h2 {
		font-family: var(--font-mono);
		font-size: clamp(1.8rem, 5vw, 2.8rem);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		align-items: start;
	}

	.about-text p {
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.85;
		margin-bottom: 20px;
	}

	.about-text p strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.divider {
		color: var(--text-muted);
		font-size: 0.85rem;
		margin: 28px 0;
		letter-spacing: 0.05em;
	}

	.meta-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	.meta-block {}

	.meta-label {
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
		display: block;
		margin-bottom: 10px;
	}

	.meta-block ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meta-block li {
		font-size: 0.9rem;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.meta-block li::before {
		content: '—';
		color: var(--accent);
		font-size: 0.8em;
	}

	/* Terminal */
	.terminal-block {
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		background: rgba(0,0,0,0.4);
		backdrop-filter: blur(4px);
		position: sticky;
		top: 100px;
	}

	.terminal-header {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 12px 16px;
		background: rgba(255,255,255,0.03);
		border-bottom: 1px solid var(--border);
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.dot.red { background: #ff5f57; }
	.dot.yellow { background: #febc2e; }
	.dot.green { background: #28c840; }

	.terminal-title {
		margin-left: 8px;
		font-size: 0.72rem;
		color: var(--text-muted);
	}

	.terminal-body {
		padding: 20px;
		font-size: 0.8rem;
		line-height: 1.7;
	}

	.line {
		display: flex;
		gap: 8px;
	}

	.prompt {
		color: var(--accent);
		flex-shrink: 0;
	}

	.cmd {
		color: #7ecfff;
	}

	.output {
		color: var(--text-secondary);
		padding-left: 16px;
	}

	.hidden-indent {
		padding-left: 16px;
	}

	.blink-cursor {
		color: var(--accent);
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (max-width: 700px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
		.terminal-block {
			position: static;
		}
		.meta-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
