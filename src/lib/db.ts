import type { ConvexClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import { useQuery } from 'convex-svelte';

export const getTasks = () => useQuery(api.tasks.get, {});

export const createTask = (client: ConvexClient) => client.mutation(api.tasks.createTask, {});
