<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
</script>

<svelte:head>
	<title>Contact | Cardellina - Chiapas Birding Tours</title>
</svelte:head>

<section class="container page">
	<h1>Tell us what you want to see</h1>
	<ContactForm />
</section>

<style>
	.page {
		padding-block: 2.5rem 4rem;
	}
</style>
