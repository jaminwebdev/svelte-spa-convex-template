<script lang="ts">
	import { SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk/client';
	import { useClerkContext } from 'svelte-clerk/client';

	// Do not destructure context to avoid losing reactivity
	const ctx = useClerkContext();

	const userEmail = $derived(ctx.user?.emailAddresses[0]?.toString().split('@')[0]);
</script>

<header class="flex justify-end p-5">
	<SignedOut>
		<SignInButton />
	</SignedOut>
	<SignedIn>
		<div class="flex gap-3">
			<UserButton />
			{userEmail}
		</div>
	</SignedIn>
</header>
