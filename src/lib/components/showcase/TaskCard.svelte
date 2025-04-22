<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Checkbox } from '@/lib/components/ui/checkbox/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import { Input } from '@/lib/components/ui/input/index';
	import { CircleX } from '@lucide/svelte';

	import { saveTask, getTasks, updateTask, removeTask } from '$lib/db/tasks';
	import { useConvexClient } from 'convex-svelte';
	import { z } from 'zod';
	import { toasts } from '@/lib/utils/toasts';
	import { useClerkContext } from 'svelte-clerk/client';
	import { cn } from '@/lib/utils';

	let taskBody = $state('');
	let mutationLoading = $state(false);
	// client has to be initialized within a component since
	// it calls getContext internally, which can only be called in a component
	const client = useConvexClient();

	// Do not destructure context to avoid losing reactivity
	const ctx = useClerkContext();

	const user_id = $derived(ctx.auth.userId);

	const query = $derived(getTasks(user_id as string));

	const createTask = async () => {
		try {
			mutationLoading = true;
			await saveTask({ client, taskBody, user_id: user_id as string });
			taskBody = '';
			mutationLoading = false;
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
			<Button onclick={createTask} disabled={taskBody.length < 1 || mutationLoading}
				>Create Task</Button
			>
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
								onCheckedChange={() => updateTask({ client, task, user_id: user_id as string })}
								aria-labelledby="terms-label"
							/>
							<span class={cn(task.isCompleted ? 'line-through' : '')}>{task.taskBody}</span>
						</Label>
						<Button
							variant="ghost"
							onclick={() => removeTask({ client, task, user_id: user_id as string })}
						>
							<CircleX />
						</Button>
					</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>
