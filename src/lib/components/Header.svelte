<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import ThemeToggle from '@/lib/components/ThemeToggle.svelte';
</script>

<header class="flex justify-end p-5">
	<SignedIn>
		<div class="flex items-center gap-6">
			<ThemeToggle />
			<div class="flex gap-3">
				<UserButton />
			</div>
		</div>
	</SignedIn>
</header>
