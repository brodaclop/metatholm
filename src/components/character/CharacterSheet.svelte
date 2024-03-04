<script lang="ts">
	import { _, date, time, locale } from 'svelte-i18n';
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
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import MdSync from 'svelte-icons/md/MdSync.svelte';
	import MdSyncProblem from 'svelte-icons/md/MdSyncProblem.svelte';
	import MdSyncDisabled from 'svelte-icons/md/MdSyncDisabled.svelte';
	import MdCheck from 'svelte-icons/md/MdCheck.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import DeleteButton from '../elements/DeleteButton.svelte';
	import Archives from './Archives.svelte';
	import { sort } from '../../model/InfoList';
	import SpellActions from './SpellActions.svelte';
	import DownloadButton from './DownloadButton.svelte';
	import UploadButton from './UploadButton.svelte';
	import { onMount } from 'svelte';
	import { Popover } from 'svelte-smooth-popover';

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
</script>

<Box flavour="character-sheet">
	<div slot="title" class="title" class:changed>
		<span>
			<IconButton title="label:save" disabled={!changed || saving || !editable} on:click={save}>
				{#if saving}
					<FaSpinner />
				{:else}
					<MdSave />
				{/if}
			</IconButton>
			<IconButton
				title="label:revert_to_saved"
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
		{$_('label:character')}: {character.name}
		<span>
			{#if editable}
				<IconButton
					title="Admin"
					on:click={() => (admin = !admin)}
					color={admin ? 'var(--delete-icon-c)' : undefined}
				>
					<MdSettings />
				</IconButton>
				<DeleteButton on:click={() => (deleting = true)} />
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
	<div class="main">
		<div class="values">
			<div class="first">
				<MainBox bind:character {editable} />
				{#if !wide}
					<div style:flex-basis="100%">
						<Box title={'character:skills'} flavour="skills">
							<Skills
								{slender}
								skills={character.skills}
								modifiedSkills={calculatedCharacter.skills}
								abilities={character.abilities}
							/>
						</Box>
					</div>
				{/if}
				<Box title="character:abilities" flavour="abilities">
					<Abilities bind:abilities={character.abilities} editable={admin} {slender} />
				</Box>
				<Box title="character:points" flavour="points">
					<Points bind:character {calculatedCharacter} {admin} {editable} />
				</Box>

				<Box flavour="inventory" title="character:weapons">
					<Weapons bind:character {editable} />
				</Box>
				<Box flavour="inventory" title="character:armours">
					<Armours bind:character {editable} />
				</Box>
			</div>
			{#if wide}
				<div class="second">
					<Box title={'character:skills'} flavour="skills">
						<Skills
							{slender}
							skills={character.skills}
							modifiedSkills={calculatedCharacter.skills}
							abilities={character.abilities}
						/>
					</Box>
				</div>
			{/if}
		</div>

		<div class="actionRow">
			<div>
				<Box title="rule:combat" flavour="action-container">
					<div>
						{#each sort(calculatedCharacter.weaponActions, 'name', $_) as action}
							<ActionCard {action} skills={calculatedCharacter.skills} />
						{/each}
					</div>
				</Box>
			</div>
			<div>
				<SpellActions {calculatedCharacter} />
			</div>
		</div>
	</div>
	<div class="noteRow">
		<Box title="label:notes" flavour="notes" grow={1}>
			<div class="noteDiv">
				<textarea disabled={!editable} bind:value={character.notes} />
			</div>
		</Box>
	</div>
</Box>

<style>
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
	}

	div.main {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	div.values {
		justify-content: space-between;
		flex-wrap: nowrap;
		flex-grow: 1;
	}

	@media screen and (max-width: 1000px) {
		div.values {
			flex-wrap: wrap;
		}
	}

	div.first {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: start;
		flex-basis: content;
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
		background-color: var(--unsaved-background-c);
	}

	.actionRow,
	.noteRow {
		display: flex;
		flex-basis: 100%;
		justify-content: space-between;
		flex-grow: 1;
	}

	.actionRow > div {
		flex-basis: 50%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: stretch;
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
