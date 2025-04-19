<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import { useClerkContext } from 'svelte-clerk/client';
	import Redirect from './Redirect.svelte';

	// Do not destructure context to avoid losing reactivity
	const ctx = useClerkContext();

	const userEmail = $derived(ctx.user?.emailAddresses[0]?.toString().split('@')[0]);
</script>

<header class="flex justify-end p-5">
	<SignedIn>
		<div class="flex gap-3">
			<UserButton />
			{userEmail}
		</div>
	</SignedIn>
</header>
