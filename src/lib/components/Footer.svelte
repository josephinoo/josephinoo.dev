<footer>
	<div class="container">
		<div class="footer-inner">
			<div class="left mono">
				josephinoo<span class="accent">*</span>
			</div>
			<div class="center">
				<span class="muted">Made with</span>
				<a
					href="https://kit.svelte.dev"
					target="_blank"
					rel="noopener"
					class="svelte-link mono"
				>
					SvelteKit
				</a>
				<span class="muted">&amp; ♥</span>
			</div>
			<div class="right mono">
				<span class="muted">© {new Date().getFullYear()}</span>
			</div>
		</div>

		<div class="separator"></div>

		<div class="subline mono">
			joseph avila — clojure developer &amp; ai engineer
		</div>
	</div>
</footer>

<script>
	// nothing to do
</script>

<style>
	footer {
		padding: 48px 24px 32px;
		border-top: 1px solid var(--border);
	}

	.container {
		max-width: var(--max-width);
		margin: 0 auto;
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
	}

	.left {
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-size: 0.82rem;
		color: var(--text-muted);
	}

	.svelte-link {
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: var(--accent);
		text-decoration: none;
		transition: opacity 0.2s;
	}

	.svelte-link:hover {
		opacity: 0.75;
	}

	.right {
		text-align: right;
		font-size: 0.78rem;
		color: var(--text-muted);
	}

	.separator {
		height: 1px;
		background: var(--border);
		margin: 20px 0 12px;
	}

	.subline {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-align: center;
	}

	@media (max-width: 480px) {
		.footer-inner {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.right { text-align: center; }
	}
</style>
