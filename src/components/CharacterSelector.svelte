<script lang="ts">
	import type { CharacterInfo } from '../model/Karakter';
	import { entries, group } from '../model/InfoList';
	import { _ } from 'svelte-i18n';

	export let currentCharacter: string;
	export let characters: Array<CharacterInfo>;

	let open = false;

	$: if (currentCharacter) {
		open = false;
	}

	//TODO: handle outside clicks
</script>

<div>
	<button on:click={() => (open = !open)}>{$_('label:characters')}</button>
	<select size={10} bind:value={currentCharacter} on:change style:display={open ? 'block' : 'none'}>
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
