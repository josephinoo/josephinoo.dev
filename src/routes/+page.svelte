<script>
	import Hero from '$lib/components/Hero.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Joseph Avila — josephinoo</title>
	<meta name="description" content="Joseph Avila — Data Engineer & Python developer building data pipelines, dashboards and web apps." />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://josephinoo.dev/" />
	<meta property="og:title" content="Joseph Avila — josephinoo" />
	<meta property="og:description" content="Joseph Avila — Data Engineer & Python developer building data pipelines, dashboards and web apps." />
	<meta property="og:image" content="https://josephinoo.dev/og.png" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://josephinoo.dev/" />
	<meta name="twitter:title" content="Joseph Avila — josephinoo" />
	<meta name="twitter:description" content="Joseph Avila — Data Engineer & Python developer building data pipelines, dashboards and web apps." />
	<meta name="twitter:image" content="https://josephinoo.dev/og.png" />
</svelte:head>

<main>
	<Hero />
	<Skills />
	<About />
	<Contact />
</main>

<style>
	main {
		position: relative;
	}
</style>
