<script>
	import Hero from '$lib/components/Hero.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Joseph Avila — josephinoo</title>
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
