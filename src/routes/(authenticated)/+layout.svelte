<script lang="ts">
	import Header from '@/lib/components/Header.svelte';
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedOut, SignedIn } from 'svelte-clerk/client';
	const { children } = $props();
</script>

<SignedIn>
	<Header />
	{@render children()}
</SignedIn>
<SignedOut>
	<Redirect route="/login" />
</SignedOut>
