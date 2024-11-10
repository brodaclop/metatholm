<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		calculateCharacter,
		type SpiritManifestationRecord,
		type Character
	} from '../../model/Karakter';
	import Box from './Box.svelte';
	import { Spirit } from '../../model/Spirits';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import SpiritAnimalEditor from './SpiritAnimalEditor.svelte';
	import EditButton from '../elements/EditButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';

	export let character: Character;
	export let editable: boolean;

	let editedManifestation: number | undefined;

	$: calculatedCharacter = calculateCharacter(character);

	const submit = (
		e: CustomEvent<{ manifestationIndex: number; editedManifestation: SpiritManifestationRecord }>
	) => {
		const { manifestationIndex, editedManifestation } = e.detail;

		if (manifestationIndex === -1) {
			character.spiritAnimals = [...character.spiritAnimals, editedManifestation];
		} else {
			character.spiritAnimals[manifestationIndex] = editedManifestation;
		}
	};
</script>

<Box title="character:spirit_animals" flavour="character">
	<table>
		<thead>
			<tr>
				<th>{$_('label:spirit_animal')}</th>
				<th>{$_('label:spirit_manifestation')}</th>
				<th>{$_('label:spirit_effect')}</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each character.spiritAnimals as animal, idx}
				<tr>
					<td>{$_(animal.name)}</td>
					<td>{$_(animal.manifestation)}</td>
					<td>{$_(Spirit.get(animal.name).manifestations[animal.manifestation] ?? '')}</td>
					<td>
						{#if editable}
							<EditButton on:click={() => (editedManifestation = idx)} />
							<DeleteButton
								on:click={() => {
									character.spiritAnimals.splice(idx, 1);
									character.spiritAnimals = character.spiritAnimals;
								}}
							/>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
		<caption>
			{$_('character:spirit_animals')}: {character.spiritAnimals.length} / <ExpressionTooltip
				expr={calculatedCharacter.maxSpiritAnimals}
			/>
			{#if editable && character.spiritAnimals.length < calculatedCharacter.maxSpiritAnimals.result}
				<EditButton on:click={() => (editedManifestation = -1)} />
			{/if}
		</caption>
	</table>
</Box>

<SpiritAnimalEditor
	{character}
	manifestationIndex={editedManifestation ?? -1}
	showModal={editedManifestation !== undefined}
	close={() => (editedManifestation = undefined)}
	on:submit={submit}
/>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid var(--box-border-c);
		caption-side: bottom;
	}

	tr:nth-child(even) {
		background-color: var(--striped-table-even-c);
	}

	tr:nth-child(odd) {
		background-color: var(--striped-table-odd-c);
	}

	td,
	th {
		padding-right: 0.5em;
		text-align: left;
	}

	th {
		background-color: var(--table-head-background-c);
	}
</style>
