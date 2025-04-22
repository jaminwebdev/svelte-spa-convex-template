import type { ConvexClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex-svelte';

import { taskBodySchema } from '@/lib/utils/runtimeValidators';
import { toasts } from '@/lib/utils/toasts';

export const getTasks = (user_id: string) => useQuery(api.tasks.get, { user_id });

type SaveTaskInput = {
	client: ConvexClient;
	taskBody: string;
	user_id: string;
};

export const saveTask = async ({ client, taskBody, user_id }: SaveTaskInput) => {
	taskBodySchema.parse(taskBody);
	await client.mutation(api.tasks.create, { body: taskBody, user_id });
	toasts.taskCreated(taskBody);
};

type UpdateTaskInput = {
	client: ConvexClient;
	task: Doc<'tasks'>;
	user_id: string;
};

export const updateTask = ({ client, task, user_id }: UpdateTaskInput) =>
	client.mutation(api.tasks.update, { id: task._id, isCompleted: !task.isCompleted, user_id });

type RemoveTaskInput = {
	client: ConvexClient;
	task: Doc<'tasks'>;
	user_id: string;
};

export const removeTask = async ({ client, task, user_id }: RemoveTaskInput) => {
	try {
		await client.mutation(api.tasks.remove, { id: task._id, user_id });
		toasts.taskDeleted();
	} catch (error: unknown) {
		toasts.error(
			error instanceof Error ? error.message : 'Something went wrong deleting your task'
		);
	}
};
