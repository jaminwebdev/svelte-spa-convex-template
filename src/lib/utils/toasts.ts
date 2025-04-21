import { toast } from 'svelte-sonner';

export const toasts = {
	error: (errorMessage: string) =>
		toast('Error', {
			description: errorMessage
		}),
	taskCreated: (text: string) =>
		toast('Task Created! 🎉', {
			description: `Body: ${text}`
		}),
	taskDeleted: () =>
		toast('Task deleted', {
			action: {
				label: 'dismiss',
				onClick: () => {}
			}
		})
};
