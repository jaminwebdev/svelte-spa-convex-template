<script lang="ts">
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Input } from '@/lib/components/ui/input/index';
	import { saveTask } from '$lib/db/tasks';
	import { useConvexClient } from 'convex-svelte';
	import { z } from 'zod';
	import { toasts } from '@/lib/utils/toasts';

	let taskBody = $state('');
	let mutationLoading = $state(false);
	const client = useConvexClient();

	const { user_id } = $props<{ user_id: string }>();

	const createTask = async () => {
		try {
			mutationLoading = true;
			await saveTask({ client, taskBody, user_id });
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

<div class="mb-6 grid gap-4">
	<Input type="text" placeholder="Enter task..." class="max-w-xs" bind:value={taskBody} />
	<Button onclick={createTask} disabled={taskBody.length < 1 || mutationLoading}>Create Task</Button
	>
</div>
