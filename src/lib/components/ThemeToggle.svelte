<script>
	import { onMount } from 'svelte';

	let theme = 'dark';

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		
		theme = storedTheme || systemTheme;
		applyTheme(theme);

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
			if (!localStorage.getItem('theme')) {
				theme = e.matches ? 'light' : 'dark';
				applyTheme(theme);
			}
		});
	});

	function applyTheme(newTheme) {
		document.documentElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(theme);
	}
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
	{#if theme === 'dark'}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
		</svg>
	{:else}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		background: var(--bg-card);
		border: 1px solid var(--border);
		color: var(--text-primary);
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
		cursor: pointer;
		transition: all var(--transition);
		padding: 0;
		backdrop-filter: blur(8px);
	}

	.theme-toggle:hover {
		border-color: var(--accent-border);
		color: var(--accent);
		background: var(--accent-dim);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--accent-dim);
	}

	:root[data-theme='light'] .theme-toggle {
		background: #fff;
		border-color: rgba(0,0,0,0.1);
		box-shadow: 0 2px 4px rgba(0,0,0,0.05);
	}

	:root[data-theme='light'] .theme-toggle:hover {
		background: #fff;
		border-color: var(--accent);
	}
</style>
