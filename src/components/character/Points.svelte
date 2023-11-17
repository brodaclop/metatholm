<script lang="ts">
	import type { CalculatedCharacter, Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import { E } from '../../logic/Expression';
	import SkillEditor from './SkillEditor.svelte';
	import GiOpenBook from 'svelte-icons/gi/GiOpenBook.svelte';
	import IconButton from '../elements/IconButton.svelte';
	export let character: Character;

	export let calculatedCharacter: CalculatedCharacter;
	export let editable = true;

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
						<span
							><input type="number" bind:value={character.current.fp} disabled={!editable} /></span
						>
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
						<span
							><input type="number" bind:value={character.current.ep} disabled={!editable} /></span
						>
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
					<span><input type="number" bind:value={character.current.mp} disabled={!editable} /></span
					>
					<span>/</span>
					<span>
						<ExpressionTooltip
							expr={E.evaluate(E.value('skill:magic_force'), {
								...character.skills
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
					<span><input type="number" bind:value={character.current.kp} disabled={!editable} /></span
					>
					<span
						><IconButton
							title="label:learn"
							disabled={!editable}
							on:click={() => (showModal = true)}><GiOpenBook /></IconButton
						></span
					>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<SkillEditor bind:character bind:showModal />

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
