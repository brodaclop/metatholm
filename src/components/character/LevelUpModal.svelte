<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { levelUpCharacter, type Character } from '../../model/Karakter';
	import { kockaDobas, parseKocka } from '../../logic/Kocka';
	import IconButton from '../elements/IconButton.svelte';
	import GiRollingDices from 'svelte-icons/gi/GiRollingDices.svelte';
	import DialogBox from '../elements/DialogBox.svelte';

	export let showModal: boolean; // boolean

	const rollForFp = () => kockaDobas(parseKocka('2d10')).osszeg;

	export let character: Character;
	export let close: () => void;
	let fpRoll: number = rollForFp();

	const submit = () => {
		character = levelUpCharacter(character, fpRoll);
		fpRoll = rollForFp();
		close();
	};
</script>

<DialogBox title="label:levelup" flavour="points" {close} {showModal}>
	<label>
		{$_('expr:fp_roll')}
		<input type="number" min={2} max={20} bind:value={fpRoll} />
	</label>
	<IconButton title="label:roll" on:click={() => (fpRoll = rollForFp())}
		><GiRollingDices /></IconButton
	>
	<button on:click={() => submit()}>Ok</button>
</DialogBox>
