<script lang="ts">
	import type { CalculatedCharacter, Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import { E } from '../../logic/Expression';
	import SkillEditor from './SkillEditor.svelte';
	import GiOpenBook from 'svelte-icons/gi/GiOpenBook.svelte';
	import IconButton from '../elements/IconButton.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	export let character: Character;

	export let admin = false;
	export let calculatedCharacter: CalculatedCharacter;
	export let editable = true;

	let showModal = false;
</script>

<div>
	<table>
		<tbody>
			<tr>
				<td>
					<LoreInfoIcon id="character:fp" />
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
					<LoreInfoIcon id="character:ep" />
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
					<LoreInfoIcon id="character:mp" />
					<span class="label">{$_('character:mp')}</span>
				</td>
				<td>
					<span><input type="number" bind:value={character.current.mp} disabled={!editable} /></span
					>
					<span>/</span>
					<span>
						<ExpressionTooltip expr={calculatedCharacter.mp} />
					</span>
				</td>
			</tr>
			<tr>
				<td>
					<LoreInfoIcon id="character:kp" />
					<span class="label">{$_('character:kp')}</span>
				</td>
				<td>
					<span
						><input
							type="number"
							bind:value={character.current.kp}
							disabled={!editable || !admin}
						/></span
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
	}

	.value {
		white-space: nowrap;
		text-align: left;
	}

	input[type='number'] {
		width: 3em;
	}
</style>
