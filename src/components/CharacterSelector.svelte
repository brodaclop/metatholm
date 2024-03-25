<script lang="ts">
	import type { CharacterInfo } from '../model/Karakter';
	import { entries, group } from '../model/InfoList';
	import { _ } from 'svelte-i18n';
	import { detectOutsideClick } from '$lib/client/outside-click';

	export let currentCharacter: string;
	export let characters: Array<CharacterInfo>;
	export let switchCharacter: (newCharacter: string | null) => void;

	let open = false;
	let selectBox: HTMLElement;

	$: if (open) {
		detectOutsideClick(selectBox, () => (open = false));
	}

	$: onChange = (newCharacter: string | null) => {
		open = false;
		switchCharacter(newCharacter);
	}
</script>

<div bind:this={selectBox}>
	<button on:click={() => (open = !open)}>{$_('label:characters')}</button>
	<select size={10} bind:value={currentCharacter} on:change={() => onChange(currentCharacter)} style:display={open ? 'block' : 'none'}>
		<option disabled value="">{$_('label:select-character')}</option>
		{#each entries(group(characters, (c) => c.user)) as [user, chars]}
			<option disabled>-- {user} --</option>
			{#each chars as character}
				<option value={character.id}
					>{character.name} ({$_(character.ancestry)}
					{$_(character.background)} / {$_('character:level')}
					{character.level})</option
				>
			{/each}
		{/each}
		<option value={null}>+ {$_('label:new-character')}</option>
	</select>
</div>

<style>
	div {
		position: relative;
	}

	button {
		border: none;
		color: var(--link-c);
		background-color: var(--header-background-c);
		font-size: 1rem;
		padding: 0;
	}

	select {
		position: absolute;
		left: 0;
	}
</style>
