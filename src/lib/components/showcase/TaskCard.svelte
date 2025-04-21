<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Checkbox } from '@/lib/components/ui/checkbox/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import { Input } from '@/lib/components/ui/input/index';
	import { CircleX } from '@lucide/svelte';

	import { saveTask, getTasks, updateTask, removeTask } from '$lib/db';
	import { useConvexClient } from 'convex-svelte';
	import { z } from 'zod';
	import { toasts } from '@/lib/toasts';

	let taskBody = $state('');
	// client has to be initialized within a component since
	// it calls getContext internally, which can only be called in a component
	const client = useConvexClient();

	const query = getTasks();
	const createTask = async () => {
		try {
			await saveTask(client, taskBody);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return toasts.error(error.errors[0].message);
			}
			toasts.error('Something went wrong creating your task');
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tasks</Card.Title>
		<Card.Description>Manage your tasklist</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="mb-6 grid gap-4">
			<Input type="text" placeholder="Enter task..." class="max-w-xs" bind:value={taskBody} />
			<Button onclick={createTask} disabled={taskBody.length < 1}>Create Task</Button>
		</div>
		{#if query.isLoading}
			Loading...
		{:else if query.error}
			failed to load: {query.error.toString()}
		{:else}
			<ul class="grid gap-3">
				{#each query.data as task}
					<li class="flex justify-between">
						<Label for={task._id} class="flex cursor-pointer items-center gap-2 text-sm font-bold">
							<Checkbox
								id={task._id}
								checked={task.isCompleted}
								onCheckedChange={() => updateTask(client, task)}
								aria-labelledby="terms-label"
							/>
							{task.text}
						</Label>
						<Button variant="ghost" onclick={() => removeTask(client, task)}>
							<CircleX />
						</Button>
					</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>
