<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Box from './Box.svelte';
	import { levelUpCharacter, type Character } from '../../model/Karakter';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import IconButton from '../elements/IconButton.svelte';
	import GiRollingDices from 'svelte-icons/gi/GiRollingDices.svelte';

	let dialog: HTMLDialogElement; // HTMLDialogElement
	export let showModal: boolean; // boolean

	$: if (dialog && showModal) dialog.showModal();

	const rollForFp = () => kockaDobas(parseKocka('2d10')).osszeg;

	export let character: Character;
	export let close: () => void;
	export let fpRoll: number = rollForFp();

	const submit = () => {
		character = levelUpCharacter(character, fpRoll);
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
		<Box title={$_('label:levelup')} background={'#eeffee'}>
			<label>
				{$_('expr:fp_roll')}
				<input type="number" min={2} max={20} bind:value={fpRoll} />
			</label>
			<IconButton title="label:roll" on:click={() => (fpRoll = rollForFp())}
				><GiRollingDices /></IconButton
			>
			<button on:click={() => submit()}>Ok</button>
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
