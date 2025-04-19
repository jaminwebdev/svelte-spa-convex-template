<script lang="ts">
	import { goto } from '$app/navigation';

	let { route } = $props();

	$effect(() => {
		if (route) {
			goto(`#${route}`);
		}
	});
</script>
