<script lang="ts">
	import { _ } from 'svelte-i18n';
	import {
		calculateCharacter,
		type SpiritManifestationRecord,
		type Character
	} from '../../model/Karakter';
	import Box from '../elements/Box.svelte';
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
			const blockEnd = character.spiritAnimals.findLastIndex(
				(sa) => sa.name === editedManifestation.name
			);
			character.spiritAnimals.splice(blockEnd + 1, 0, editedManifestation);
			character.spiritAnimals = character.spiritAnimals;
		} else {
			character.spiritAnimals[manifestationIndex] = editedManifestation;
		}
	};
</script>

<Box title="character:spirit_animals" flavour="character">
	<table class="standard wide">
		<thead>
			<tr>
				<th>{$_('label:spirit_animal')}</th>
				<th>{$_('label:spirit_manifestation')}</th>
				<th>{$_('label:spirit_effect')}</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each character.spiritAnimals as animal, idx (`${JSON.stringify(animal)}${idx}`)}
				{@const firstRowOfAnimal =
					idx === 0 || character.spiritAnimals[idx - 1].name !== animal.name}
				{@const numberOfRows = character.spiritAnimals.filter(
					(sa) => sa.name === animal.name
				).length}
				<tr>
					{#if firstRowOfAnimal}
						<th rowspan={numberOfRows}>{$_(animal.name)}</th>
					{/if}
					<td>{$_(animal.manifestation)}</td>
					<td>{$_(Spirit.get(animal.name).manifestations[animal.manifestation] ?? '')}</td>
					<td class="right">
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
