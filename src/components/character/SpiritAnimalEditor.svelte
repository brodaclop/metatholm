<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import { Spirit } from '../../model/Spirits';
	import type { Character, SpiritManifestationRecord } from '../../model/Karakter';
	import { entries, group } from '../../model/InfoList';
	import DialogBox from '../elements/DialogBox.svelte';

	const dispatch = createEventDispatcher();

	export let character: Character;

	export let manifestationIndex: number;
	export let close: () => void;

	let editedManifestation: SpiritManifestationRecord = {
		name: '',
		manifestation: ''
	} as unknown as SpiritManifestationRecord;

	let initialised: boolean = false;

	$: if (!showModal) {
		initialised = false;
	}

	$: selectedManifestation =
		manifestationIndex !== -1 ? character.spiritAnimals[manifestationIndex] : undefined;

	$: {
		if (showModal && !initialised) {
			editedManifestation = {
				...(selectedManifestation ??
					({
						name: '',
						manifestation: ''
					} as unknown as SpiritManifestationRecord))
			};
			initialised = true;
		}
	}

	$: currentManifestations = group(character.spiritAnimals, (n) => n.name);

	$: manifestationOptions = entries(Spirit.get(editedManifestation.name).manifestations)
		.filter((m) => {
			const existingManifestations =
				currentManifestations[editedManifestation.name]?.map((cm) => cm.manifestation) ?? [];
			return (
				selectedManifestation?.manifestation === m[0] || !existingManifestations.includes(m[0])
			);
		})
		.map((m) => ({ value: m[0], description: m[1] }));

	const submit = () => {
		dispatch('submit', { manifestationIndex, editedManifestation });
		close();
	};
</script>

<DialogBox title="character:spirit_animals" flavour="inventory" {close} {showModal}>
	<select bind:value={editedManifestation.name} disabled={manifestationIndex !== -1}>
		<option disabled value="">Select</option>
		{#each Spirit.list() as spirit}
			<option value={spirit.name}>{$_(spirit.name)}</option>
		{/each}
	</select>
	<ul>
		{#each manifestationOptions as { value, description }}
			<li>
				<span><strong>{$_(value)}</strong>: {$_(description)}</span>
				<input type="radio" {value} bind:group={editedManifestation.manifestation} />
			</li>
		{/each}
	</ul>

	<button
		disabled={!editedManifestation.name || !editedManifestation.manifestation}
		on:click={submit}>OK</button
	>
</DialogBox>

<style>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	li {
		border-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
		padding: 0.5em;
		margin: 0.5em;
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
	}

	li span {
		text-align: left;
	}
</style>
