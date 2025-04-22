<script lang="ts">
	import Header from '@/lib/components/Header.svelte';
	import Footer from '@/lib/components/Footer.svelte';
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedOut, SignedIn } from 'svelte-clerk/client';
	const { children } = $props();
</script>

<SignedIn>
	<Header />
	{@render children()}
	<Footer />
</SignedIn>
<SignedOut>
	<Redirect route="login" />
</SignedOut>
