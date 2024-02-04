<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import type { NPC } from '../../../model/npc/Npc';
	import Npc from '../../../components/NPC.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import IconButton from '../../../components/elements/IconButton.svelte';
	import MdCancel from 'svelte-icons/md/MdCancel.svelte';
	import DeleteButton from '../../../components/elements/DeleteButton.svelte';
	import MdKeyboardArrowUp from 'svelte-icons/md/MdKeyboardArrowUp.svelte';

	export let data: PageData;
	let character: NPC;

	const saveCharacter = () => {
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
			.then(() => invalidate('db:npclist'))
			.then(() => invalidateAll());
	};

	const deleteCharacter = () => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(character));
		fetch('?/deleteCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:npclist'))
			.then(() => goto('/npc'));
	};

	let saving = false;

	const save = async () => {
		saving = true;
		await saveCharacter();
		saving = false;
	};

	$: if (!character || character.id !== data.character.id) {
		character = JSON.parse(JSON.stringify(data.character));
	}

	$: changed = character && JSON.stringify(data.character) !== JSON.stringify(character);
</script>

<div>
	{#if data.character}
		<Npc bind:character editable>
			<span slot="leftbutton">
				<IconButton title="label:save" disabled={!changed || saving} on:click={save}>
					{#if saving}
						<FaSpinner />
					{:else}
						<MdSave />
					{/if}
				</IconButton>
				<IconButton
					title="label:revert_to_saved"
					color={changed || saving ? 'darkred' : undefined}
					disabled={!changed || saving}
					on:click={() => (character = JSON.parse(JSON.stringify(data.character)))}
				>
					<MdCancel />
				</IconButton>
			</span>
			<span slot="rightbutton">
				<IconButton title="label:back_to_list" on:click={() => goto('/npc')}>
					<MdKeyboardArrowUp />
				</IconButton>
				<DeleteButton on:click={deleteCharacter} />
			</span>
		</Npc>
	{:else}
		Loading...
	{/if}
</div>
