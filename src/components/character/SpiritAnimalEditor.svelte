<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import { Spirit } from '../../model/Spirits';
	import type { Character, SpiritManifestationRecord } from '../../model/Karakter';
	import { entries } from '../../model/InfoList';

	const dispatch = createEventDispatcher();
	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

	export let character: Character;

	export let manifestationIndex: number;
	export let close: () => void;

	let editedManifestation: SpiritManifestationRecord = {
		name: 'spirit:bear',
		manifestation: 'manifestation:fur'
	};

	let initialised: boolean = false;

	$: if (!showModal) {
		initialised = false;
	}

	$: {
		if (showModal && !initialised) {
			editedManifestation =
				manifestationIndex !== -1
					? { ...character.spiritAnimals[manifestationIndex] }
					: {
							name: 'spirit:bear',
							manifestation: 'manifestation:fur'
					  };
			initialised = true;
		}
	}

	const submit = () => {
		dispatch('submit', { manifestationIndex, editedManifestation });
		dialog.close();
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		close();
	}}
	on:click|self={() => dialog.close()}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			dialog.close();
		}
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="content" on:click|stopPropagation>
		<Box title="character:spirit_animals" flavour="inventory">
			<select bind:value={editedManifestation.name} disabled={manifestationIndex !== -1}>
				{#each Spirit.list() as spirit}
					<option value={spirit.name}>{$_(spirit.name)}</option>
				{/each}
			</select>
			<select bind:value={editedManifestation.manifestation}>
				{#each entries(Spirit.get(editedManifestation.name).manifestations) as manifestation}
					<option value={manifestation[0]}>{$_(manifestation[0])}: {$_(manifestation[1])}</option>
				{/each}
			</select>
			<button on:click={submit}>OK</button>
		</Box>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		background: transparent;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
