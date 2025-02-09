<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { sort } from '../../model/InfoList';
	import type { CalculatedCharacter } from '../../model/Karakter';
	import Box from '../elements/Box.svelte';
	import ActionCard from './ActionCard.svelte';

	export let calculatedCharacter: CalculatedCharacter;
	export let flexBasis: string | undefined = undefined;
</script>

<Box title="rule:combat" flavour="action-container" {flexBasis}>
	<div>
		{#each sort(calculatedCharacter.weaponActions, 'name', $_) as action}
			<ActionCard {action} skills={calculatedCharacter.skills} />
		{/each}
	</div>
</Box>
