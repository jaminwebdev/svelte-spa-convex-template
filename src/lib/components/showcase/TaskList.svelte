<script lang="ts">
	import TaskItem from './TaskItem.svelte';
	import type { Doc } from '@/convex/_generated/dataModel';
	import { getTasks } from '$lib/db/tasks';

	const { user_id } = $props<{ user_id: string }>();

	const query = $derived(getTasks(user_id));
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
