<script lang="ts">
	import type { Character } from '../../model/Karakter';
	import Box from '../character/Box.svelte';
	import { _ } from 'svelte-i18n';

	export let character: Character;
	export let ap: number;
</script>

<Box background="cornsilk">
	<div class="bignumber-container">
		<div class="bignumber">
			{ap}
		</div>
		<div class="caption">Action points</div>
	</div>
	<div class="bignumber-container">
		<div class="bignumber">
			{character.current.fp}
		</div>
		<div class="caption">{$_('character:fp')}</div>
	</div>
	<div class="bignumber-container">
		<div class="bignumber">
			{character.current.ep}
		</div>
		<div class="caption">{$_('character:ep')}</div>
	</div>
</Box>

<style>
	.bignumber-container {
		text-align: center;
	}

	.bignumber {
		font-size: x-large;
		font-weight: bold;
	}
</style>
