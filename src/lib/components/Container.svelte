<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utils';

	type Props = {
		classes?: string;
		children: Snippet;
	};

	const { classes, children }: Props = $props();
</script>

<div class={cn('mx-auto max-w-6xl', classes)}>
	{@render children()}
</div>
