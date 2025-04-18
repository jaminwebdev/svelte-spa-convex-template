<script lang="ts">
	import Header from '@/components/Header.svelte';
	const { children } = $props();
</script>

<Header />
{@render children()}
