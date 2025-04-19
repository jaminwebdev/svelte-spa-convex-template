<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { themes, type ThemeOptions } from '@/lib/themes';

	let currentTheme = $state(themes[0]);

	function checkSystemColorPreference() {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		currentTheme = prefersDarkScheme ? 'dark' : 'light';
	}

	onMount(() => {
		checkSystemColorPreference();
	});

	const switchTheme = (theme: ThemeOptions) => {
		document.documentElement.className = '';
		document.documentElement.classList.add(theme);
		currentTheme = theme;
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="outline" size="icon" class="bg-muted rounded-full">
			{#if currentTheme.includes('dark')}
				<Moon
					className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
			{:else}
				<Sun
					className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
			{/if}
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		{#each themes as theme}
			<DropdownMenu.Item onSelect={() => switchTheme(theme)}>
				<div class="flex cursor-pointer items-center gap-2">
					{#if theme.includes('light')}
						<Sun />
					{:else}
						<Moon />
					{/if}
					{theme}
				</div>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
