<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import Box from '../elements/Box.svelte';
	import Abilities from './Abilities.svelte';
	import Skills from './Skills.svelte';
	import { calculateCharacter, type Character } from '../../model/Karakter';
	import Points from './Points.svelte';
	import Weapons from './Weapons.svelte';
	import MainBox from './MainBox.svelte';
	import { beforeNavigate } from '$app/navigation';
	import Armours from './Armours.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';
	import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte';
	import MdFileDownload from 'svelte-icons/md/MdFileDownload.svelte';
	import MdCancel from 'svelte-icons/md/MdCancel.svelte';
	import MdFileUpload from 'svelte-icons/md/MdFileUpload.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import MdSync from 'svelte-icons/md/MdSync.svelte';
	import MdSyncProblem from 'svelte-icons/md/MdSyncProblem.svelte';
	import MdSyncDisabled from 'svelte-icons/md/MdSyncDisabled.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import Archives from './Archives.svelte';
	import SpellActions from './SpellActions.svelte';
	import DownloadButton from './DownloadButton.svelte';
	import UploadButton from './UploadButton.svelte';
	import { onMount } from 'svelte';
	import { Popover } from 'svelte-smooth-popover';
	import SpiritAnimals from './SpiritAnimals.svelte';
	import WeaponActions from './WeaponActions.svelte';

	export let initialCharacter: Character;
	export let archives: Array<{ char: Character; timestamp: number }>;
	export let editable: boolean;
	export let deleteCharacter: () => void;
	export let saveCharacter: (char: Character) => Promise<void>;

	let character: Character;
	let admin = false;

	let slender = false;
	let wide = true;

	onMount(() => {
		const slenderMatcher = window.matchMedia('(max-width: 550px)');
		slender = slenderMatcher.matches;
		slenderMatcher.addEventListener('change', (e) => (slender = e.matches));
		const wideMatcher = window.matchMedia('(min-width: 1000px)');
		wide = wideMatcher.matches;
		wideMatcher.addEventListener('change', (e) => (wide = e.matches));
	});

	$: if (!character || character.id !== initialCharacter.id) {
		character = JSON.parse(JSON.stringify(initialCharacter));
	}

	$: changed = character && JSON.stringify(initialCharacter) !== JSON.stringify(character);

	$: calculatedCharacter = calculateCharacter(character);

	let saving = false;

	let deleting = false;

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

	const upload = (contents: string) => {
		const uploadedChar: Character = JSON.parse(contents);
		character = { ...uploadedChar, id: character.id };
	};

	const synchronise = (contents: string) => {
		const json = JSON.parse(contents);
		const appearanceBlock = json.properties.find((p: any) => p.type === 'appearance')?.data;
		character.tableplop = {
			characterId: json.properties[0].characterId,
			tokenURL: json.appearance,
			private: json.private,
			appearanceBlock
		};
	};

	const BOXES: Array<string> = [
		'label:character',
		'character:skills',
		'character:abilities',
		'character:points',
		'character:weapons',
		'character:armours',
		'character:spirit_animals',
		'rule:combat',
		'character:spells',
		'character:notes'
	];
</script>

<Box flavour="character-sheet">
	<div slot="title" class="title" class:changed>
		<span style:text-align="left">
			<IconButton
				title="label:save"
				disabled={!changed || saving || !editable}
				on:click={save}
				withText
			>
				{#if saving}
					<FaSpinner />
				{:else}
					<MdSave />
				{/if}
			</IconButton>
			<IconButton
				title="label:revert_to_saved"
				withText
				color={changed || saving ? 'var(--delete-icon-c)' : undefined}
				disabled={!changed || saving || !editable}
				on:click={() => (character = JSON.parse(JSON.stringify(initialCharacter)))}
			>
				<MdCancel />
			</IconButton>

			<Archives {archives} bind:character disabled={!editable} />
			<DownloadButton
				disabled={changed || saving}
				title="label:download_character"
				href="/api/character/{character.id}"
				download="{character.name}.char"
			>
				<MdFileDownload />
			</DownloadButton>

			<UploadButton title="label:upload_character" disabled={!editable} onUpload={upload}>
				<MdFileUpload />
			</UploadButton>

			{#if !character.tableplop}
				<UploadButton title="tableplop:synchronise" disabled={!editable} onUpload={synchronise}>
					<MdSyncProblem />
				</UploadButton>
			{:else}
				<IconButton
					withText
					title="tableplop:unsynchronise"
					disabled={!editable}
					on:click={() => {
						character.tableplop = undefined;
					}}
				>
					<MdSyncDisabled />
				</IconButton>
			{/if}
			<DownloadButton
				disabled={changed || saving || !character.tableplop}
				title="tableplop:export"
				href="/api/tableplop/{character.id}?lang={$locale}"
				download="{character.name}-tableplop.json"
			>
				<MdSync />
			</DownloadButton>
		</span>
		<span style:text-align="center">{$_('label:character')}: {character.name}</span>
		<span style:text-align="right">
			{#if editable}
				<IconButton
					title="Admin"
					withText
					on:click={() => (admin = !admin)}
					color={admin ? 'var(--delete-icon-c)' : undefined}
				>
					<MdSettings />
				</IconButton>
				<DeleteButton withText on:click={() => (deleting = true)} />
				{#if deleting}
					<Popover
						open={true}
						showOnClick={true}
						borderRadius={10}
						caretBg="black"
						on:close={() => (deleting = false)}
						hideOnExternalClick={true}
					>
						<div class="confirm-delete">
							<div>
								{$_('label:delete')}?
							</div>
							<div>
								<IconButton
									title="label:delete"
									on:click={deleteCharacter}
									color="var(--delete-icon-c)"
								>
									<MdCheck />
								</IconButton>
								<IconButton title="label:cancel" on:click={() => (deleting = false)}>
									<MdCancel />
								</IconButton>
							</div>
						</div>
					</Popover>
				{/if}
			{/if}
		</span>
	</div>

	<nav class="jumplinks">
		{#each BOXES as box}
			<button
				on:click={() =>
					document.getElementById(box)?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
				>{$_(box)}</button
			>
		{/each}
	</nav>

	<div class="main">
		<MainBox bind:character {editable} />
		<Skills
			{slender}
			skills={character.skills}
			modifiedSkills={calculatedCharacter.skills}
			abilities={character.abilities}
		/>
		<Abilities bind:abilities={character.abilities} editable={admin} {slender} />
		<Points bind:character {calculatedCharacter} {admin} {editable} />
		<Weapons bind:character {editable} />
		<Armours bind:character {editable} />
		<SpiritAnimals bind:character {editable} />
		<WeaponActions {calculatedCharacter} flexBasis="40%" />
		<SpellActions {calculatedCharacter} flexBasis="40%" />
		<div class="noteRow">
			<Box title="character:notes" flavour="notes" grow={1}>
				<div class="noteDiv">
					<textarea disabled={!editable} bind:value={character.notes} />
				</div>
			</Box>
		</div>
	</div>
</Box>

<style>
	nav.jumplinks {
		position: sticky;
		top: 2.75em;
		z-index: 1;
		background-color: var(--box-c-character-sheet);
	}

	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}

	div.main {
		display: flex;
		flex-direction: row;
		align-items: stretch;
	}

	div.title {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-radius: 0.2em;
		padding-left: 1px;
		padding-right: 1px;
	}

	div.title > span {
		flex-basis: 33%;
		flex-grow: 0;
		flex-shrink: 0;
	}

	div.changed {
		background-color: var(--unsaved-background-c);
	}

	.noteRow {
		display: flex;
		flex-basis: 100%;
		justify-content: space-between;
		flex-grow: 1;
	}

	div.noteDiv {
		width: 100%;
		display: flex;
	}

	textarea {
		flex-grow: 1;
		width: 100%;
		height: 10rem;
		resize: vertical;
	}

	.confirm-delete {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--header-background-c);
		padding: 0.25em;
		border-color: var(--border-color-c);
		border-style: solid;
		border-radius: 0.25rem;
		border-width: 3px;
	}
</style>
