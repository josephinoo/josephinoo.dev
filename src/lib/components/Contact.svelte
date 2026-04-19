<script>
	import { onMount } from 'svelte';

	let section;
	let isVisible = false;

	const links = [
		{
			label: 'GitHub',
			handle: '@josephinoo',
			url: 'https://github.com/josephinoo',
			description: 'Code, projects, and contributions',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
		},
		{
			label: 'LinkedIn',
			handle: 'linkedin/josephinoo',
			url: 'https://linkedin.com/in/josephinoo',
			description: 'Professional profile and experience',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
		},
		{
			label: 'Email',
			handle: 'hello@josephinoo.dev',
			url: 'mailto:hello@josephinoo.dev',
			description: 'For project inquiries and collaboration',
			icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
		},
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { isVisible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<section id="contact" bind:this={section} class:visible={isVisible}>
	<div class="container">
		<div class="section-header">
			<span class="section-label mono">04 — Contact</span>
			<h2>Let's connect<span class="accent">.</span></h2>
			<p class="section-sub">
				Don't be a stranger. Reach out for collaboration, questions, or just to say hi.
			</p>
		</div>

		<div class="links-grid">
			{#each links as link, i}
				<a
					href={link.url}
					target={link.url.startsWith('mailto') ? '_self' : '_blank'}
					rel="noopener noreferrer"
					class="link-card"
					style="--delay: {i * 100}ms"
				>
					<div class="link-icon">
						{@html link.icon}
					</div>
					<div class="link-info">
						<span class="link-label mono">{link.label}</span>
						<span class="link-handle">{link.handle}</span>
						<span class="link-desc">{link.description}</span>
					</div>
					<div class="link-arrow">→</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	#contact {
		padding: var(--section-gap) 24px;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.7s ease, transform 0.7s ease;
	}

	#contact.visible {
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
		margin-bottom: 12px;
	}

	.section-sub {
		color: var(--text-secondary);
		font-size: 1rem;
		max-width: 460px;
		line-height: 1.7;
	}

	.links-grid {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.link-card {
		display: grid;
		grid-template-columns: 52px 1fr auto;
		align-items: center;
		gap: 20px;
		padding: 24px;
		border: 1px solid var(--border);
		border-radius: 6px;
		background: var(--bg-card);
		color: var(--text-primary);
		text-decoration: none;
		transition: border-color 0.2s, background 0.2s, transform 0.2s;
		opacity: 0;
		transform: translateX(-12px);
	}

	#contact.visible .link-card {
		opacity: 1;
		transform: translateX(0);
		transition: opacity 0.5s ease var(--delay), transform 0.5s ease var(--delay),
					border-color 0.2s, background 0.2s;
	}

	.link-card:hover {
		border-color: var(--accent-border);
		background: var(--accent-dim);
	}

	.link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border: 1px solid var(--border);
		border-radius: 6px;
		color: var(--text-secondary);
		transition: border-color 0.2s, color 0.2s;
		background: rgba(255,255,255,0.02);
	}

	.link-card:hover .link-icon {
		border-color: var(--accent-border);
		color: var(--accent);
	}

	.link-info {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.link-label {
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.link-handle {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.link-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.link-arrow {
		font-size: 1.2rem;
		color: var(--text-muted);
		transition: color 0.2s, transform 0.2s;
	}

	.link-card:hover .link-arrow {
		color: var(--accent);
		transform: translateX(4px);
	}

	@media (max-width: 480px) {
		.link-card {
			grid-template-columns: 44px 1fr auto;
			gap: 14px;
			padding: 18px;
		}
	}
</style>
