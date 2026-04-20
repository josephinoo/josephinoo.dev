<script>
	export let data;
</script>

<svelte:head>
	<title>Blog — Joseph Avila</title>
</svelte:head>

<section id="blog-list">
	<div class="container">
		<div class="section-header">
			<span class="section-label mono">05 — Blog</span>
			<h1>Writing & Insights<span class="accent">.</span></h1>
			<p class="section-sub">Thoughts on engineering, data, and building things.</p>
		</div>

		<div class="posts-grid">
			{#if data.posts.length === 0}
				<p class="empty-state mono">No posts yet. Stay tuned.</p>
			{:else}
				{#each data.posts as post}
					<a href="/blog/{post.slug}" class="post-card">
						<div class="post-meta mono">
							<span class="date">{post.date}</span>
							{#if post.tags}
								<span class="tags">
									{#each post.tags as tag}
										<span class="tag">#{tag}</span>
									{/each}
								</span>
							{/if}
						</div>
						<h2 class="post-title">{post.title}</h2>
						<p class="post-desc">{post.description}</p>
						<span class="read-more mono">Read post <span class="arrow">→</span></span>
					</a>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	#blog-list {
		padding: 140px 24px var(--section-gap);
		min-height: 80vh;
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.section-header {
		margin-bottom: 72px;
	}

	.section-label {
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		display: block;
		margin-bottom: 12px;
	}

	h1 {
		font-family: var(--font-mono);
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		margin-bottom: 16px;
	}

	.section-sub {
		color: var(--text-secondary);
		font-size: 1.1rem;
		max-width: 500px;
	}

	.posts-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid var(--border);
	}

	.post-card {
		display: block;
		padding: 40px 0;
		border-bottom: 1px solid var(--border);
		transition: transform 0.2s;
	}

	.post-card:hover {
		transform: translateX(8px);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-bottom: 16px;
	}

	.tag {
		color: var(--accent);
		margin-right: 12px;
	}

	.post-title {
		font-family: var(--font-mono);
		font-size: 1.6rem;
		font-weight: 700;
		margin-bottom: 12px;
		color: var(--text-primary);
		transition: color 0.2s;
	}

	.post-card:hover .post-title {
		color: var(--accent);
	}

	.post-desc {
		color: var(--text-secondary);
		font-size: 1rem;
		line-height: 1.6;
		margin-bottom: 24px;
		max-width: 700px;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--text-primary);
		font-weight: 700;
	}

	.arrow {
		transition: transform 0.2s;
	}

	.post-card:hover .arrow {
		transform: translateX(4px);
	}

	.empty-state {
		padding: 40px 0;
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	@media (max-width: 600px) {
		#blog-list {
			padding-top: 100px;
		}
		.post-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
	}
</style>
