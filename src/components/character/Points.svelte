<script lang="ts">
	import type { CalculatedCharacter, Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import { E } from '../../logic/Expression';
	import SkillEditor from './SkillEditor.svelte';

	export let character: Character;

	export let calculatedCharacter: CalculatedCharacter;

	let showModal = false;
</script>

<div>
	<table>
		<tbody>
			<tr>
				<td>
					<span class="label">{$_('character:fp')}</span>
				</td>
				<td>
					<span class="value">
						<span><input type="number" bind:value={character.current.fp} /></span>
						<span>/</span>
						<span>
							<ExpressionTooltip expr={calculatedCharacter.fp} />
						</span>
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<span class="label">{$_('character:ep')}</span>
				</td>
				<td>
					<span class="value">
						<span><input type="number" bind:value={character.current.ep} /></span>
						<span>/</span>
						<span>
							<ExpressionTooltip expr={calculatedCharacter.ep} />
						</span>
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<span class="label">{$_('character:mp')}</span>
				</td>
				<td>
					<span><input type="number" bind:value={character.current.mp} /></span>
					<span>/</span>
					<span>
						<ExpressionTooltip
							expr={E.evaluate(E.value('skill:magic_force'), {
								...calculatedCharacter.skills
							})}
						/>
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<span class="label">{$_('character:kp')}</span>
				</td>
				<td>
					<span><input type="number" bind:value={character.current.kp} /></span>
					<span><button on:click={() => (showModal = true)}>Learn</button></span>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<SkillEditor bind:character {calculatedCharacter} bind:showModal />

<style>
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	.label {
		white-space: nowrap;
		font-weight: bold;
		padding-right: 0.5em;
	}

	.value {
		white-space: nowrap;
		text-align: left;
	}

	input[type='number'] {
		width: 3em;
	}
</style>
