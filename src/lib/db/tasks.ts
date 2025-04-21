import type { ConvexClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex-svelte';

import { taskBodySchema } from '@/lib/utils/runtimeValidators';
import { toasts } from '@/lib/utils/toasts';

export const getTasks = () => useQuery(api.tasks.get, {});

export const saveTask = async (client: ConvexClient, taskBody: string) => {
	taskBodySchema.parse(taskBody);
	await client.mutation(api.tasks.create, { body: taskBody });
	toasts.taskCreated(taskBody);
};

export const updateTask = (client: ConvexClient, task: Doc<'tasks'>) =>
	client.mutation(api.tasks.update, { id: task._id, isCompleted: !task.isCompleted });

export const removeTask = async (client: ConvexClient, task: Doc<'tasks'>) => {
	try {
		await client.mutation(api.tasks.remove, { id: task._id });
		toasts.taskDeleted();
	} catch (error: unknown) {
		toasts.error(
			error instanceof Error ? error.message : 'Something went wrong deleting your task'
		);
	}
};
