<script lang="ts">
	import type { CharacterInfo } from '../model/Karakter';
	import { entries, group } from '../model/InfoList';
	import { _ } from 'svelte-i18n';
	import { detectOutsideClick } from '$lib/client/outside-click';

	export let characters: Array<CharacterInfo>;
	export let disabled = false;
	export let currentUser: string;

	let open = false;
	let selectBox: HTMLElement;

	$: if (open) {
		detectOutsideClick(selectBox, () => (open = false));
	}

	const charactersByUser = entries(group(characters, (c) => c.userId));
</script>

<div class="outer" bind:this={selectBox}>
	<button {disabled} class:active={open} on:click={() => (open = !open)}
		>{$_('label:characters')}</button
	>
	<div class="selection" style:display={open ? 'block' : 'none'}>
		{#each charactersByUser as [user, chars]}
			<span>{$_('label:player')}: {chars[0].user}</span>
			{#each chars as character}
				<div class="characterCard">
					<div>
						<a on:click={() => (open = false)} href="/character/{character.id}">{character.name}</a>
					</div>
					<div class="secondLine">
						{$_('label:level', { values: { level: character.level } })}
						{$_(character.ancestry)}
						{$_(character.background)}
					</div>
				</div>
			{/each}
			{#if user === currentUser}
				<div class="characterCard">
					<a on:click={() => (open = false)} href="/create">{$_('label:new-character')}</a>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	div.outer {
		position: relative;
	}

	button {
		border: none;
		color: var(--link-c);
		background-color: var(--header-background-c);
		font-size: 1rem;
		padding: 0;
	}

	button.active {
		background-color: var(--background-c);
	}

	.selection {
		width: fit-content;
		white-space: nowrap;
		position: absolute;
		background-color: var(--background-c);
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-top: none;
		border-color: var(--box-border-c);
		padding: 0.5em;
		margin-left: -3px;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
		left: 0;
	}

	.characterCard {
		text-align: left;
		border-top-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
		padding: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
	}

	.characterCard .secondLine {
		font-size: x-small;
	}
</style>
