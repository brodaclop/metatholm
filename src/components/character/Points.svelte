<script lang="ts">
	import type { CalculatedCharacter, Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import { E } from '../../logic/Expression';

	export let character: Character;

	export let calculatedCharacter: CalculatedCharacter;
</script>

<div>
	<div class="row">
		<span class="label">{$_('character:fp')}</span>
		<span class="value">
			<span>{character.current.fp}</span>
			<span>/</span>
			<span>
				<ExpressionTooltip expr={calculatedCharacter.fp} />
			</span>
		</span>
	</div>
	<div class="row">
		<span class="label">{$_('character:ep')}</span>
		<span class="value">
			<span>{character.current.ep}</span>
			<span>/</span>
			<span>
				<ExpressionTooltip expr={calculatedCharacter.ep} />
			</span>
		</span>
	</div>
	<div class="row">
		<span class="label">{$_('character:mp')}</span>
		<span class="value">
			<span>{character.current.mp}</span>
			<span>/</span>
			<span>
				<ExpressionTooltip
					expr={E.evaluate(E.value('skill:magic_force'), {
						'skill:magic_force': calculatedCharacter.skills.magic_force ?? 0
					})}
				/>
			</span>
		</span>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: nowrap;
	}

	.label {
		flex-basis: 90%;
		white-space: nowrap;
		font-weight: bold;
		padding-right: 0.5em;
	}

	.value {
		flex-basis: 10%;
		white-space: nowrap;
	}
</style>
