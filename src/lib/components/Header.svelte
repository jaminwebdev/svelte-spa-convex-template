<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import ThemeToggle from '@/lib/components/ThemeToggle.svelte';
	import { Boxes } from '@lucide/svelte';
	import Container from './Container.svelte';
</script>

<div class="border-b-primary/50 border-1">
	<Container classes="max-w-[88rem]">
		<header class=" flex justify-between p-5">
			<a href="/#" class="flex items-center gap-1">
				<Boxes size="32" />
				<span class="text-2xl font-black">Site Logo</span>
			</a>
			<SignedIn>
				<div class="flex items-center gap-6">
					<ThemeToggle />
					<div class="flex gap-3">
						<UserButton />
					</div>
				</div>
			</SignedIn>
		</header>
	</Container>
</div>
