<script lang="ts">
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Checkbox } from '@/lib/components/ui/checkbox/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import * as Card from '@/lib/components/ui/card/index';
	import { Input } from '@/lib/components/ui/input/index';
	import { toast } from 'svelte-sonner';

	import { createTask, getTasks, updateTask, deleteTask } from '$lib/db';

	import { useConvexClient } from 'convex-svelte';
	import type { Doc } from '@/convex/_generated/dataModel';
	import { CircleX } from '@lucide/svelte';
	import { toasts } from '@/lib/toasts';

	let todoBody = $state('');

	const client = useConvexClient();

	const query = getTasks();

	const saveTodo = async () => {
		try {
			await createTask(client, todoBody);
			toasts.taskCreated(todoBody);
			todoBody = '';
		} catch (error) {
			toasts.error('Something went wrong creating your todo');
		}
	};

	const updateTaskStatus = (task: Doc<'tasks'>) => updateTask(client, task);
	const removeTask = async (task: Doc<'tasks'>) => {
		try {
			await deleteTask(client, task);
			toasts.taskDeleted();
		} catch (error) {
			toasts.error('Something went wrong deleting your todo');
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Todos</Card.Title>
		<Card.Description>Manage your todo list</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="mb-6 grid gap-4">
			<Input type="text" placeholder="Enter todo..." class="max-w-xs" bind:value={todoBody} />
			<Button onclick={saveTodo}>Create Task</Button>
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
								onCheckedChange={() => updateTaskStatus(task)}
								aria-labelledby="terms-label"
							/>
							{task.text}
						</Label>
						<Button variant="ghost" onclick={() => removeTask(task)}>
							<CircleX />
						</Button>
					</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>
