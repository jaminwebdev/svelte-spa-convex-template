import type { ConvexClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex-svelte';

export const getTasks = () => useQuery(api.tasks.get, {});

export const createTask = (client: ConvexClient, body: string) =>
	client.mutation(api.tasks.createTask, { body });

export const updateTask = (client: ConvexClient, task: Doc<'tasks'>) =>
	client.mutation(api.tasks.updateTask, { id: task._id, isCompleted: !task.isCompleted });

export const deleteTask = (client: ConvexClient, task: Doc<'tasks'>) =>
	client.mutation(api.tasks.deleteTask, { id: task._id });
