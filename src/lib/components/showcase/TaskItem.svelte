<script lang="ts">
	import { Button } from '@/lib/components/ui/button/index.js';
	import { Checkbox } from '@/lib/components/ui/checkbox/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import { CircleX } from '@lucide/svelte';
	import { updateTask, removeTask } from '$lib/db/tasks';
	import { useConvexClient } from 'convex-svelte';
	import { cn } from '@/lib/utils';
	import type { Doc } from '@/convex/_generated/dataModel';

	const client = useConvexClient();

	const { task, user_id } = $props<{
		task: Doc<'tasks'>;
		user_id: string;
	}>();
</script>

<li class="flex justify-between">
	<Label for={task._id} class="flex cursor-pointer items-center gap-2 text-sm font-bold">
		<Checkbox
			id={task._id}
			checked={task.isCompleted}
			onCheckedChange={() => updateTask({ client, task, user_id })}
			aria-labelledby="terms-label"
		/>
		<span class={cn(task.isCompleted ? 'line-through' : '')}>{task.taskBody}</span>
	</Label>
	<Button variant="ghost" onclick={() => removeTask({ client, task, user_id })}>
		<CircleX />
	</Button>
</li>
