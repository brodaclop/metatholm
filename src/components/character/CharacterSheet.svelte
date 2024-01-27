<script lang="ts">
	import { _, date, time } from 'svelte-i18n';
	import Box from './Box.svelte';
	import Abilities from './Abilities.svelte';
	import Skills from './Skills.svelte';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import Points from './Points.svelte';
	import ActionCard from './ActionCard.svelte';
	import Weapons from './Weapons.svelte';
	import MainBox from './MainBox.svelte';
	import { beforeNavigate } from '$app/navigation';
	import Armours from './Armours.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import MdFileDownload from 'svelte-icons/md/MdFileDownload.svelte';
	import MdCancel from 'svelte-icons/md/MdCancel.svelte';
	import MdFileUpload from 'svelte-icons/md/MdFileUpload.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import Archives from './Archives.svelte';
	import { stringify } from 'uuid';

	export let initialCharacter: Character;
	export let archives: Array<{ char: Character; timestamp: number }>;
	export let deleteCharacter: () => void;
	export let saveCharacter: (char: Character) => Promise<void>;

	let character: Character;

	let saving = false;

	$: if (!character || character.id !== initialCharacter.id) {
		character = JSON.parse(JSON.stringify(initialCharacter));
	}

	$: changed = character && JSON.stringify(initialCharacter) !== JSON.stringify(character);

	$: console.log(character, initialCharacter);

	$: calculatedCharacter = calculateCharacter(character);

	const save = async () => {
		saving = true;
		await saveCharacter(character);
		saving = false;
	};

	beforeNavigate(({ cancel }) => {
		if (changed) {
			if (!confirm('Save changes to character?')) {
				cancel();
			}
		}
	});

	const upload = async (e: any) => {
		const files: FileList | null = (e.target as HTMLInputElement).files;
		const file = files?.[0];
		if (file) {
			const uploadedChar: Character = JSON.parse(await file.text());
			character = { ...uploadedChar, id: character.id };
			e.target.value = '';
		}
	};
</script>

<Box flavour="character-sheet">
	<div slot="title" class="title" class:changed>
		<span>
			<IconButton title="label:save" disabled={!changed || saving} on:click={save}>
				{#if saving}
					<FaSpinner />
				{:else}
					<MdSave />
				{/if}
			</IconButton>
			<IconButton
				title="label:revert_to_saved"
				color={changed || saving ? 'red' : undefined}
				disabled={!changed || saving}
				on:click={() => (character = JSON.parse(JSON.stringify(initialCharacter)))}
			>
				<MdCancel />
			</IconButton>
			<Archives {archives} bind:character />
			{#if changed || saving}
				<span class="download" style:opacity="0.3">
					<MdFileDownload />
				</span>
			{:else}
				<a
					class="download"
					title={$_('label:download_character')}
					href="/api/character/{character.id}"
					download="{character.name}.char"><MdFileDownload /></a
				>
			{/if}

			<form class="uploadForm">
				<div>
					<input
						accept=".char"
						type="file"
						id="file"
						name="fileToUpload"
						required
						on:change={upload}
					/>
				</div>

				<IconButton title="label:upload_character" plain>
					<MdFileUpload />
				</IconButton>
			</form>
		</span>
		{$_('label:character')}: {character.name}
		<span>
			<DeleteButton on:click={deleteCharacter} />
		</span>
	</div>
	<div>
		<div class="values">
			<div class="first">
				<MainBox bind:character />
				<Box title="character:abilities" flavour="abilities">
					<Abilities bind:abilities={character.abilities} />
				</Box>
				<Box title="character:points" flavour="points">
					<Points bind:character {calculatedCharacter} />
				</Box>

				<Box flavour="inventory" title="character:weapons">
					<Weapons bind:character />
				</Box>
				<Box flavour="inventory" title="character:armours">
					<Armours bind:character />
				</Box>
			</div>
			<div class="second">
				<Box title={'character:skills'} flavour="skills">
					<Skills
						skills={character.skills}
						modifiedSkills={calculatedCharacter.skills}
						abilities={character.abilities}
					/>
				</Box>
			</div>
		</div>

		<div class="actionRow">
			<Box title="action:title" flavour="action-container">
				<div>
					{#each calculatedCharacter.actions as action}
						<ActionCard {action} skills={calculatedCharacter.skills} />
					{/each}
				</div>
			</Box>
		</div>
	</div>
</Box>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}

	div.first {
		flex-basis: 70%;
	}

	div.second {
		flex-basis: 30%;
	}

	div.title {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-radius: 0.2em;
		padding-left: 1px;
		padding-right: 1px;
	}

	div.changed {
		background-color: darksalmon;
	}

	.actionRow {
		flex-basis: 100%;
	}

	.download {
		display: inline-block;
		color: black;
		height: 0.85rem;
	}

	.uploadForm,
	.uploadForm div {
		display: inline;
	}

	.uploadForm input {
		opacity: 0;
		position: absolute;
	}
</style>
