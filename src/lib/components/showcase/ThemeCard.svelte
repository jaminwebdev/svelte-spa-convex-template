<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import { ScrollArea } from '@/lib/components/ui/scroll-area/index';
	import { themes, type ThemeOptions } from '@/lib/utils/themes';
	import { Sun, Moon } from '@lucide/svelte';
	import * as RadioGroup from '@/lib/components/ui/radio-group/index';
	import Label from '@/lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';

	let currentTheme = $state(themes[0]);

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) return handleThemeChange(storedTheme);
		checkSystemColorPreference();
	});

	const handleThemeChange = (theme: ThemeOptions) => {
		currentTheme = theme;
		document.documentElement.className = '';
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
	};

	const checkSystemColorPreference = () => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		currentTheme = prefersDarkScheme ? 'dark' : 'light';
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Theme Settings</Card.Title>
		<Card.Description>Manage your theme here</Card.Description>
	</Card.Header>
	<Card.Content>
		<ScrollArea class="h-[300px] w-full rounded-md border p-4">
			<RadioGroup.Root value={currentTheme} onValueChange={handleThemeChange}>
				{#each themes as theme}
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value={theme} id={theme} />
						<Label for={theme} class="flex items-center gap-2">
							{#if theme.includes('light')}
								<Sun />
							{:else}
								<Moon />
							{/if}
							{theme}
						</Label>
					</div>
				{/each}
			</RadioGroup.Root>
		</ScrollArea>
	</Card.Content>
</Card.Root>
