<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { v4 } from 'uuid';
	import DeleteButton from '../../components/elements/DeleteButton.svelte';
	import IconButton from '../../components/elements/IconButton.svelte';
	import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte';
	import MdPeople from 'svelte-icons/md/MdPeople.svelte';
	import type { Encounter } from '../../model/npc/Encounter';
	import Box from '../../components/character/Box.svelte';

	export let data: PageData;

	const createEncounter = () => {
		const body: FormData = new FormData();
		const id = v4();
		const toSave = JSON.stringify({
			id,
			name: '...',
			npcs: [],
			notes: ''
		} as Encounter);
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

	const cloneEncounter = (id: string) => {
		const body: FormData = new FormData();
		body.set('encounter', JSON.stringify({ id }));
		fetch('?/cloneEncounter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:encounterlist'))
			.then(() => goto('/encounter'));
	};

	const deleteEncounter = (id: string) => {
		const body: FormData = new FormData();
		body.set('encounter', JSON.stringify({ id }));
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
</script>

<Box flavour="plain" title="label:encounters">
	{#if data.encounters}
		<ul>
			{#each data.encounters as encounter}
				<li>
					<a href="/encounter/{encounter.id}">{encounter.name}</a>
					<span>
						<IconButton title="clone" on:click={() => cloneEncounter(encounter.id)}>
							<MdPeople />
						</IconButton>
						<DeleteButton on:click={() => deleteEncounter(encounter.id)} />
					</span>
				</li>
			{/each}
			<li class="new-button">
				<IconButton title="label:new-character" on:click={createEncounter}>
					<MdPersonAdd />
				</IconButton>
			</li>
		</ul>
	{:else}
		Loading...
	{/if}
</Box>

<style>
	ul {
		list-style-type: none;
		display: flex;
		margin: 0;
		padding: 0;
	}

	li {
		margin-right: 1rem;
		border: 1px solid black;
		border-radius: 0.5em;
		flex-basis: 15%;
		display: flex;
		padding-left: 0.4rem;
		justify-content: space-between;
	}

	li.new-button {
		border: none;
		flex-basis: content;
		text-align: center;
		border-radius: 0;
		box-sizing: border-box;
		background-color: transparent !important;
		padding: 0;
	}

	li > span {
		text-align: right;
	}

	li:nth-child(odd) {
		background-color: whitesmoke;
	}
</style>
