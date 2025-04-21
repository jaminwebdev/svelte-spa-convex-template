import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query('tasks').collect();
	}
});

export const createTask = mutation({
	args: { body: v.string() },
	handler: async (ctx, args) => {
		await ctx.db.insert('tasks', { text: args.body, date: 'today', isCompleted: false });
	}
});

export const updateTask = mutation({
	args: { id: v.id('tasks'), isCompleted: v.boolean() },
	handler: async (ctx, args) => {
		const { id, isCompleted } = args;
		await ctx.db.patch(id, { isCompleted });
	}
});

export const deleteTask = mutation({
	args: { id: v.id('tasks') },
	handler: async (ctx, args) => {
		const { id } = args;
		await ctx.db.delete(id);
	}
});
