import { query, mutation } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('tasks').collect();
	}
});

export const createTask = mutation({
	args: {},
	handler: async (ctx) => {
		await ctx.db.insert('tasks', { text: 'Example task', date: 'today', isCompleted: false });
	}
});
