<script lang="ts">
	import { createTask, getTasks } from '$lib/db';
	import { useConvexClient } from 'convex-svelte';
	import Button from '@/lib/components/ui/button/button.svelte';

	const client = useConvexClient();

	const query = getTasks();

	const handleClick = () => createTask(client);
</script>

{#if query.isLoading}
	Loading...
{:else if query.error}
	failed to load: {query.error.toString()}
{:else}
	<ul>
		{#each query.data as task}
			<li>
				{task.isCompleted ? '☑' : '☐'}
				<span>{task.text}</span>
				<span>Date: {task.date || 'unknown'}</span>
			</li>
		{/each}
	</ul>
	<Button onclick={handleClick}>Create Task</Button>
{/if}
