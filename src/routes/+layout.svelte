<script lang="ts">
	import '../app.css';
	import { PUBLIC_CONVEX_URL, PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { ClerkProvider } from 'svelte-clerk/client';
	import { setupConvex } from 'convex-svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<Toaster />
	{@render children()}
</ClerkProvider>
