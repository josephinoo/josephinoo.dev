<script>
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} — Joseph Avila</title>
	<meta name="description" content={data.meta.description} />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://josephinoo.dev/blog/{data.slug}" />
	<meta property="og:title" content="{data.meta.title} — Joseph Avila" />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content="josephinoo.dev" />
	<meta property="og:locale" content="es_ES" />
	<meta property="og:image" content="https://josephinoo.dev/og/{data.slug}.png?v=2" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:alt" content="Portada del post: {data.meta.title}" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{data.meta.title} — Joseph Avila" />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:image" content="https://josephinoo.dev/og/{data.slug}.png" />
</svelte:head>

<article class="post-container">
	<header class="post-header">
		<div class="container">
			<a href="/blog" class="back-link mono">
				<span class="arrow">←</span> Back to blog
			</a>
			
			<div class="meta mono">
				<span class="date">{data.meta.date}</span>
				{#if data.meta.tags}
					<span class="tags">
						{#each data.meta.tags as tag}
							<span class="tag">#{tag}</span>
						{/each}
					</span>
				{/if}
			</div>

			<h1>{data.meta.title}</h1>
			<p class="description">{data.meta.description}</p>
		</div>
	</header>

	<div class="post-content">
		<div class="container">
			<svelte:component this={data.content} />
		</div>
	</div>

	<footer class="post-footer">
		<div class="container">
			<div class="share-info mono">
				Thanks for reading. More at <a href="https://github.com/josephinoo">@josephinoo</a>.
			</div>
		</div>
	</footer>
</article>

<style>
	.post-container {
		padding-top: 100px;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.post-header {
		padding: 40px 0;
		border-bottom: 1px solid var(--border);
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--accent);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 40px;
	}

	.back-link:hover .arrow {
		transform: translateX(-4px);
	}

	.meta {
		display: flex;
		gap: 20px;
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-bottom: 20px;
	}

	.tag {
		color: var(--accent);
		margin-right: 12px;
	}

	h1 {
		font-family: var(--font-mono);
		font-size: clamp(2rem, 5vw, 3.2rem);
		line-height: 1.1;
		margin-bottom: 24px;
		font-weight: 700;
		color: var(--text-primary);
	}

	.description {
		font-size: 1.2rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.post-content {
		padding: 40px 0;
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--text-secondary);
	}

	/* Markdown Styling */
	:global(.post-content h2) {
		font-family: var(--font-mono);
		color: var(--text-primary);
		margin: 60px 0 24px;
		font-size: 1.8rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 12px;
	}

	:global(.post-content h3) {
		font-family: var(--font-mono);
		color: var(--text-primary);
		margin: 40px 0 20px;
		font-size: 1.4rem;
	}

	:global(.post-content p) {
		margin-bottom: 24px;
	}

	:global(.post-content strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	:global(.post-content ul, .post-content ol) {
		margin-bottom: 24px;
		padding-left: 20px;
	}

	:global(.post-content li) {
		margin-bottom: 12px;
	}

	:global(.post-content blockquote) {
		border-left: 2px solid var(--accent);
		padding-left: 24px;
		margin: 40px 0;
		font-style: italic;
		color: var(--text-primary);
	}

	:global(.post-content pre) {
		background: rgba(255,255,255,0.03);
		padding: 24px;
		border-radius: 8px;
		border: 1px solid var(--border);
		overflow-x: auto;
		margin: 40px 0;
	}

	:global(.post-content code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: rgba(255,255,255,0.05);
		padding: 2px 6px;
		border-radius: 4px;
		color: var(--accent);
	}

	:global(.post-content pre code) {
		background: none;
		padding: 0;
		color: inherit;
		display: block;
	}

	/* Code Syntax Highlighting (Prism compatible) */
	:global(.post-content .token.keyword) { color: #ff79c6; }
	:global(.post-content .token.string) { color: #f1fa8c; }
	:global(.post-content .token.comment) { color: #6272a4; }
	:global(.post-content .token.function) { color: #50fa7b; }
	:global(.post-content .token.number) { color: #bd93f9; }
	:global(.post-content .token.operator) { color: #ff79c6; }
	:global(.post-content .token.class-name) { color: #8be9fd; }
	:global(.post-content .token.constant) { color: #bd93f9; }
	:global(.post-content .token.boolean) { color: #bd93f9; }
	:global(.post-content .token.property) { color: #ffb86c; }
	:global(.post-content .token.attr-name) { color: #50fa7b; }

	:root[data-theme='light'] :global(.post-content pre) {
		background: #f5f5f5;
	}

	:root[data-theme='light'] :global(.post-content .token.keyword) { color: #d73a49; }
	:root[data-theme='light'] :global(.post-content .token.string) { color: #032f62; }
	:root[data-theme='light'] :global(.post-content .token.comment) { color: #6a737d; }
	:root[data-theme='light'] :global(.post-content .token.function) { color: #6f42c1; }
	:root[data-theme='light'] :global(.post-content .token.number) { color: #005cc5; }

	.post-footer {
		padding: 80px 0;
		border-top: 1px solid var(--border);
	}

	.share-info {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-align: center;
	}

	.share-info a {
		color: var(--text-primary);
		border-bottom: 1px solid var(--accent);
	}

	@media (max-width: 600px) {
		.post-container {
			padding-top: 80px;
		}
		.meta {
			flex-direction: column;
			gap: 8px;
		}
	}
</style>
