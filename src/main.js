import App from './App.svelte';
// Test

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;