<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import TaskItem from './TaskItem.svelte';
	import { api } from '@/convex/_generated/api';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	const { user_id } = $props<{ user_id: string }>();

	const query = $derived(useQuery(api.tasks.get, { user_id }));
</script>

{#if query.isLoading}
	<div class="flex items-center space-x-4">
		<Skeleton class="h-12 w-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<ul class="grid gap-1">
		{#each query.data as task}
			<TaskItem {task} {user_id} />
		{/each}
	</ul>
{/if}
