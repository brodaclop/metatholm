<script lang="ts">
	import type { PageData } from './$types';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { v4 } from 'uuid';
	import type { NPC } from '../../model/npc/Npc';
	import DeleteButton from '../../components/elements/DeleteButton.svelte';
	import IconButton from '../../components/elements/IconButton.svelte';
	import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte';
	import MdPeople from 'svelte-icons/md/MdPeople.svelte';
	import Box from '../../components/character/Box.svelte';
	import Loading from '../../components/Loading.svelte';

	export let data: PageData;

	const createCharacter = () => {
		const body: FormData = new FormData();
		const id = v4();
		const toSave = JSON.stringify({
			id,
			name: '...',
			ep: 0,
			maxEp: 0,
			fp: 0,
			maxFp: 0,
			dr: 0,
			magic_res: 0,
			reactions: 0,
			spot_hidden: 0,
			notes: '',
			extra_skills: [],
			weapons: [],
			spells: []
		} as NPC);
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

	const cloneCharacter = (id: string) => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify({ id }));
		fetch('?/cloneCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		})
			.then(() => invalidate('db:npclist'))
			.then(() => goto('/npc'));
	};

	const deleteCharacter = (id: string) => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify({ id }));
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
</script>

<Box flavour="plain" title="label:npcs">
	{#if data.characters}
		<ul>
			{#each data.characters as character}
				<li>
					<a href="/npc/{character.id}">{character.name}</a>
					<span>
						<IconButton title="clone" on:click={() => cloneCharacter(character.id)}>
							<MdPeople />
						</IconButton>
						<DeleteButton on:click={() => deleteCharacter(character.id)} />
					</span>
				</li>
			{/each}
			<li class="new-button">
				<IconButton title="label:new-character" on:click={createCharacter}>
					<MdPersonAdd />
				</IconButton>
			</li>
		</ul>
	{:else}
		<Loading />
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
		border: 1px solid var(--default-border-c);
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
		background-color: var(--striped-table-odd-c);
	}

	li:nth-child(even) {
		background-color: var(--striped-table-even-c);
	}
</style>
