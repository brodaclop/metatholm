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
	import MdKeyboardArrowUp from 'svelte-icons/md/MdKeyboardArrowUp.svelte';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import { v4 } from 'uuid';
	import Loading from '../../../components/Loading.svelte';

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

	let edited: Array<string> = [];
</script>

<div>
	{#if data.encounter}
		<Box flavour="character">
			<div slot="title" class="title">
				<div class="left-buttons">
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
							add.id = v4();
							dedupeName(add);
							encounter.npcs = [...encounter.npcs, add];
						}}
					>
						<MdPersonAdd />
					</IconButton>
				</div>
				<div>
					<input type="text" bind:value={encounter.name} />
				</div>
				<div class="right-buttons">
					<IconButton title="label:back_to_list" on:click={() => goto('/encounter')}>
						<MdKeyboardArrowUp />
					</IconButton>

					<DeleteButton on:click={deleteEncounter} />
				</div>
			</div>
			<nav class="buttonbar">
				{#each encounter.npcs as character, i}
					<button on:click={() => document.getElementById(`npc-${i}`)?.scrollIntoView()}
						>{character.name}</button
					>
				{/each}
			</nav>
			<div>
				{#each encounter.npcs as character, i}
					<div id="npc-{i}">
						<Npc bind:character editable={edited.includes(character.id)}>
							<span slot="leftbutton">
								<IconButton
									title="label:edit"
									on:click={() => {
										if (edited.includes(character.id)) {
											edited = edited.filter((id) => id !== character.id);
										} else {
											edited = [...edited, character.id];
										}
									}}
								>
									{#if edited.includes(character.id)}
										<MdCheck />
									{:else}
										<MdEdit />
									{/if}
								</IconButton>
							</span>
							<span slot="rightbutton">
								<IconButton
									title="clone"
									on:click={() => {
										const clone = JSON.parse(JSON.stringify(character));
										clone.id = v4();
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
					</div>
				{/each}
			</div>
		</Box>
	{:else}
		<Loading />
	{/if}
</div>

<style>
	.title {
		display: flex;
		justify-content: space-between;
	}

	.left-buttons,
	.right-buttons {
		flex-basis: 33%;
	}

	.left-buttons {
		text-align: left;
	}

	.right-buttons {
		text-align: right;
	}

	select {
		padding-top: 0;
		vertical-align: text-top;
	}

	.buttonbar {
		text-align: center;
		margin-bottom: 0.4em;
		position: sticky;
		top: 2rem;
		z-index: 10000;
		width: 100%;
		background-color: #ddddff;
	}
</style>
