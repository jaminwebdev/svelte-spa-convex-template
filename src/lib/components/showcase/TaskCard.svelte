<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import { useClerkContext } from 'svelte-clerk/client';
	import TaskInput from './TaskInput.svelte';
	import TaskList from './TaskList.svelte';

	const ctx = useClerkContext();
	const user_id = $derived(ctx.auth.userId as string);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tasks</Card.Title>
		<Card.Description>Manage your tasklist</Card.Description>
	</Card.Header>
	<Card.Content>
		<TaskInput {user_id} />
		<TaskList {user_id} />
	</Card.Content>
</Card.Root>
