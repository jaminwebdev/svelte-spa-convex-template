import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema(
	{
		tasks: defineTable({
			text: v.string(),
			isCompleted: v.boolean(),
			date: v.optional(v.string())
		})
	},
	{
		schemaValidation: true
	}
);
