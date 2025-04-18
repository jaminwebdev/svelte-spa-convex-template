<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<a href="#/">Home</a>
	<a href="#/example">Example</a>
	<a href="#/login">Login</a>
</header>
{@render children()}
