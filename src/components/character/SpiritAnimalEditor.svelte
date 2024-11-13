<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	export let showModal: boolean; // boolean
	import { createEventDispatcher } from 'svelte';
	import { Spirit } from '../../model/Spirits';
	import type { Character, SpiritManifestationRecord } from '../../model/Karakter';
	import { entries, group } from '../../model/InfoList';

	const dispatch = createEventDispatcher();
	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

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
