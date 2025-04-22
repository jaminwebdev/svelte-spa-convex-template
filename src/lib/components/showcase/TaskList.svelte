<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import TaskItem from './TaskItem.svelte';
	import { api } from '@/convex/_generated/api';

	const { user_id } = $props<{ user_id: string }>();

	const query = $derived(useQuery(api.tasks.get, { user_id }));
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<ul class="grid gap-3">
		{#each query.data as task}
			<TaskItem {task} {user_id} />
		{/each}
	</ul>
{/if}
