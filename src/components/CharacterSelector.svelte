<script lang="ts">
	import type { CharacterInfo } from '../model/Karakter';
	import { entries, group } from '../model/InfoList';
	import { _ } from 'svelte-i18n';
	import { detectOutsideClick } from '$lib/client/outside-click';

	export let characters: Array<CharacterInfo>;
	export let disabled = false;

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
	<div class="selection" class:open>
		<div class="newCharacter">
			<a on:click={() => (open = false)} href="/create">{$_('label:new-character')}</a>
		</div>
		{#each charactersByUser as [userId, chars]}
			<article class="player">
				<div class="name">{$_('label:player')}: {chars[0].user}</div>
				{#each chars as character}
					<div class="characterCard">
						<div>
							<a on:click={() => (open = false)} href="/character/{character.id}"
								>{character.name}</a
							>
						</div>
						<div class="secondLine">
							{$_('label:level', { values: { level: character.level } })}
							{$_(character.ancestry)}
							{$_(character.background)}
						</div>
					</div>
				{/each}
			</article>
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
		background-color: transparent;
		font-size: 1rem;
		padding: 0;
		transition: background-color 0.2s ease-in-out;
	}

	.newCharacter > a {
		transition: background-color 0.2s ease-in-out;
	}

	.newCharacter > a:hover,
	.characterCard:hover {
		background-color: var(--menu-item-hover-c);
	}

	button.active {
		background-color: var(--menu-item-hover-c);
	}

	.selection.open {
		display: block;
		opacity: 1;
	}

	/* TODO: fix transitions */

	.selection {
		transition: opacity 0.5s ease-in-out, display 0.5s allow-discrete;
		display: none;
		opacity: 0;
		width: fit-content;
		white-space: nowrap;
		position: absolute;
		background-color: var(--background-c);
		border-top-right-radius: 1em;
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		border-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
		padding: 0.5em;
		margin-left: -3px;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
		left: 0;
	}

	@starting-style {
		.selection {
			opacity: 0;
		}
	}

	.newCharacter {
		text-align: center;
	}

	.characterCard {
		text-align: left;
		padding: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
		transition: background-color 0.2s ease-in-out;
		border-radius: 0.5em;
	}

	.characterCard .secondLine {
		font-size: x-small;
	}

	article.player {
		display: flex;
		flex-direction: row;
		border-top-style: groove;
		border-width: 3px;
		border-color: var(--box-border-c);
	}

	article.player div.name {
		flex-basis: 25%;
		align-self: center;
	}

	@media screen and (max-width: 1000px) {
		div.outer {
			position: initial;
		}

		button {
			border: none;
			color: var(--link-c);
			background-color: transparent;
			font-size: 1rem;
			padding: 0;
		}

		button:hover {
			background-color: var(--menu-item-hover-c);
		}

		button.active {
			background-color: var(--menu-item-hover-c);
		}

		.selection {
			width: 100%;
			white-space: nowrap;
			position: inherit;
			background-color: var(--background-c);
			border: none;
			border-radius: 0;
			border-bottom-style: groove;
			border-bottom-width: 3px;
			border-bottom-color: var(--box-border-c);
			margin-left: -3px;
			padding: 0.5em;
		}

		.newCharacter {
			text-align: center;
		}

		.characterCard {
			text-align: left;
			padding: 0.5em;
			filter: drop-shadow(0.2em 0.2em 0.2em var(--box-shadow-c));
		}

		.characterCard .secondLine {
			font-size: x-small;
		}

		article.player {
			display: flex;
			flex-direction: column;
			border-top-style: groove;
			border-width: 3px;
			border-color: var(--box-border-c);
		}

		article.player div.name {
			flex-basis: 25%;
			align-self: center;
		}
	}
</style>
