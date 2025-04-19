<script lang="ts">
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedIn, SignedOut, SignIn } from 'svelte-clerk/client';
</script>

<SignedOut>
	<SignIn />
</SignedOut>
<SignedIn>
	<Redirect route="/" />
</SignedIn>
