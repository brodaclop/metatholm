<script lang="ts">
	import type { PageData } from './$types';
	import CharacterSheet from '../../../components/character/CharacterSheet.svelte';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import type { Character } from '../../../model/Karakter';
	import Loading from '../../../components/Loading.svelte';

	export let data: PageData;

	const saveCharacter = (character: Character) => {
		const body: FormData = new FormData();
		const toSave = JSON.stringify(character);
		body.set('character', toSave);
		return fetch('?/saveCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:characterlist'))
			.then(() => invalidateAll());
	};

	const deleteCharacter = () => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(data.character));
		fetch('?/deleteCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:characterlist'))
			.then(() => goto('/'));
	};
</script>

<div>
	{#if data.character}
		<CharacterSheet
			initialCharacter={data.character}
			editable={data.owner === 'global' || data.owner === data.user?.id}
			{deleteCharacter}
			{saveCharacter}
			archives={data.archives}
		/>
	{:else}
		<Loading />
	{/if}
</div>
