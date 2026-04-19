<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Joseph Avila — josephinoo</title>
</svelte:head>

<Nav />
<main>
	<Hero />
	<Skills />
	<About />
	<Contact />
</main>
<Footer />

<style>
	main {
		position: relative;
	}
</style>
