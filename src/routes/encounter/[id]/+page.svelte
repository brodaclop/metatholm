<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import Npc from '../../../components/NPC.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import IconButton from '../../../components/elements/IconButton.svelte';
	import MdCancel from 'svelte-icons/md/MdCancel.svelte';
	import DeleteButton from '../../../components/elements/DeleteButton.svelte';
	import type { Encounter } from '../../../model/npc/Encounter';
	import Box from '../../../components/character/Box.svelte';
	import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte';
	import MdPeople from 'svelte-icons/md/MdPeople.svelte';
	import type { NPC } from '../../../model/npc/Npc';

	export let data: PageData;
	let encounter: Encounter;

	const saveEncounter = () => {
		const body: FormData = new FormData();
		const toSave = JSON.stringify(encounter);
		body.set('encounter', toSave);
		return fetch('?/saveEncounter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:encounterlist'))
			.then(() => invalidateAll());
	};

	const deleteEncounter = () => {
		const body: FormData = new FormData();
		body.set('encounter', JSON.stringify(encounter));
		fetch('?/deleteEncounter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:encounterlist'))
			.then(() => goto('/encounter'));
	};

	let saving = false;

	const save = async () => {
		saving = true;
		await saveEncounter();
		saving = false;
	};

	$: if (!encounter || encounter.id !== data.encounter.id) {
		encounter = JSON.parse(JSON.stringify(data.encounter));
	}

	$: changed = encounter && JSON.stringify(data.encounter) !== JSON.stringify(encounter);

	let selectedNpc: NPC;

	const baseName = (npc: NPC): string => {
		const suffixIdx = npc.name.lastIndexOf(' (');
		const baseName = suffixIdx === -1 ? npc.name : npc.name.substring(0, suffixIdx);
		return baseName;
	};

	const dedupeName = (npc: NPC) => {
		const base = baseName(npc);
		const clashCount = encounter.npcs.filter((n) => baseName(n) === base && n !== npc).length;
		if (clashCount > 0) {
			npc.name = `${base} (${clashCount})`;
		}
	};
</script>

<div>
	{#if data.encounter}
		<Box flavour="character">
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
				on:click={() => (encounter = JSON.parse(JSON.stringify(data.encounter)))}
			>
				<MdCancel />
			</IconButton>
			<DeleteButton on:click={deleteEncounter} />
			<select bind:value={selectedNpc}>
				{#each data.npcs as npc}
					<option value={npc}>{npc.name}</option>
				{/each}
			</select>
			<IconButton
				title="label:new-character"
				disabled={!selectedNpc}
				on:click={() => {
					const add = JSON.parse(JSON.stringify(selectedNpc));
					dedupeName(add);
					encounter.npcs = [...encounter.npcs, add];
				}}
			>
				<MdPersonAdd />
			</IconButton>
			{#each encounter.npcs as character, i}
				<Npc bind:character>
					<span slot="rightbutton">
						<IconButton
							title="clone"
							on:click={() => {
								const clone = JSON.parse(JSON.stringify(character));
								dedupeName(clone);
								encounter.npcs = [...encounter.npcs, clone];
							}}
						>
							<MdPeople />
						</IconButton>
						<DeleteButton
							on:click={() => {
								encounter.npcs.splice(i, 1);
								encounter.npcs = encounter.npcs;
							}}
						/>
					</span>
				</Npc>
			{/each}
		</Box>
	{:else}
		Loading...
	{/if}
</div>
