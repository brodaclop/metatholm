<script lang="ts">
	import type { Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import InfoBox from './InfoBox.svelte';

	export let character: Character;
	export let ap: number;
</script>

<InfoBox
	flavour="simulator-life"
	lines={[
		{
			label: 'action:ap',
			value: ap
		},
		{
			label: 'character:fp',
			value: character.current.fp
		},
		{
			label: 'character:ep',
			value: character.current.ep
		}
	]}
/>
