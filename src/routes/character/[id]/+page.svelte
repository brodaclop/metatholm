<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let changes = 0;

	$: if (data.character) {
		changes = changes + 1;
	}

	$: if (changes >= 2) {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(data.character));
		changes = 0;
		fetch('?/saveCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		}).then(() => invalidate('db:characterlist'));
	}

	const deleteCharacter = () => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(data.character));
		changes = 0;
		fetch('?/deleteCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		}).then(() => invalidate('db:characterlist'));
	};

	import CharacterSheet from '../../../components/character/CharacterSheet.svelte';
	import { invalidate } from '$app/navigation';
</script>

<div>
	<CharacterSheet bind:character={data.character} {deleteCharacter} />
</div>
