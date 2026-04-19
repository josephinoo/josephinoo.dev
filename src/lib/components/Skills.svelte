<script>
	const categories = [
		{
			label: 'Languages',
			items: [
				{ name: 'Clojure', icon: '(λ)', highlight: true },
				{ name: 'Python', icon: '🐍' },
				{ name: 'JavaScript', icon: '⚡' },
				{ name: 'SQL', icon: '⊞' },
				{ name: 'Bash', icon: '$' },
			]
		},
		{
			label: 'AI / ML',
			items: [
				{ name: 'PyTorch', icon: '🔥' },
				{ name: 'scikit-learn', icon: '⚙' },
				{ name: 'Pandas', icon: '🐼' },
				{ name: 'NumPy', icon: '∑' },
				{ name: 'LangChain', icon: '🔗' },
				{ name: 'HuggingFace', icon: '🤗' },
			]
		},
		{
			label: 'Data',
			items: [
				{ name: 'dbt', icon: '◇' },
				{ name: 'Spark', icon: '✧' },
				{ name: 'Kafka', icon: '≡' },
				{ name: 'PostgreSQL', icon: '🐘' },
				{ name: 'DuckDB', icon: '🦆' },
			]
		},
		{
			label: 'Web & Tools',
			items: [
				{ name: 'Svelte', icon: '◈' },
				{ name: 'Docker', icon: '🐳' },
				{ name: 'Git', icon: '⎇' },
				{ name: 'Linux', icon: '🐧' },
				{ name: 'AWS', icon: '☁' },
			]
		},
	];

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

<section id="skills" bind:this={section} class:visible={isVisible}>
	<div class="container">
		<div class="section-header">
			<span class="section-label mono">02 — Skills</span>
			<h2>What I work with<span class="accent">.</span></h2>
			<p class="section-sub">Tools and technologies I use to build and ship things.</p>
		</div>

		<div class="categories">
			{#each categories as cat, i}
				<div class="category" style="--delay: {i * 80}ms">
					<h3 class="cat-label mono">{cat.label}</h3>
					<div class="pills">
						{#each cat.items as item}
							<span class="pill" class:highlight={item.highlight}>
								<span class="pill-icon">{item.icon}</span>
								{item.name}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	#skills {
		padding: var(--section-gap) 24px;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	#skills.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 56px;
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
		line-height: 1.1;
		margin-bottom: 12px;
	}

	.section-sub {
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.categories {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.category {
		display: grid;
		grid-template-columns: 140px 1fr;
		gap: 0 32px;
		align-items: start;
		opacity: 0;
		transform: translateX(-10px);
		transition: opacity 0.5s ease var(--delay), transform 0.5s ease var(--delay);
	}

	#skills.visible .category {
		opacity: 1;
		transform: translateX(0);
	}

	.cat-label {
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding-top: 8px;
		border-top: 1px solid var(--border);
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.02em;
		color: var(--text-secondary);
		border: 1px solid var(--border);
		padding: 6px 14px;
		border-radius: 4px;
		background: var(--bg-card);
		transition: border-color var(--transition), color var(--transition), background var(--transition);
		cursor: default;
	}

	.pill:hover {
		border-color: var(--border-hover);
		color: var(--text-primary);
		background: rgba(255,255,255,0.06);
	}

	.pill.highlight {
		border-color: var(--accent-border);
		color: var(--accent);
		background: var(--accent-dim);
	}

	.pill.highlight:hover {
		background: rgba(255, 51, 51, 0.25);
	}

	.pill-icon {
		font-size: 0.85em;
		font-style: normal;
	}

	@media (max-width: 560px) {
		.category {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.cat-label {
			border-top: none;
			border-left: 2px solid var(--accent);
			padding-left: 10px;
			padding-top: 0;
		}
	}
</style>
