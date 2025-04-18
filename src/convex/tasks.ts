import { query, mutation } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		const tasks = await ctx.db.query('tasks').collect();
		return tasks.map((task) => ({ ...task, assigner: 'tom' }));
	}
});

export const createTask = mutation({
	args: {},
	handler: async (ctx) => {
		await ctx.db.insert('tasks', { text: 'Example task', date: 'today' });
	}
});
