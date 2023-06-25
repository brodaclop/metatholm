<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { E } from '../../logic/Expression';
	import { entries } from '../../model/InfoList';
	import type { CalculatedCharacter, Character, Level } from '../../model/Karakter';
	import { SKILL_KP } from '../../model/Rules';
	import { Skill, type SkillInfo } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
	export let character: Character;
	export let calculatedCharacter: CalculatedCharacter;
	export let admin = false;

	let changes: Partial<Record<Skill, number>> = {};
	$: if (character) {
		changes = {};
	}
	$: remainingKp = character.current.kp;
	$: sums = Object.fromEntries(
		Skill.list().map((s) => [
			s.name,
			(calculatedCharacter.skills[s.name] ?? 0) + (changes[s.name] ?? 0)
		])
	);

	const plus = (name: Skill) => {
		const skill: SkillInfo = Skill.get(name);
		if (sums[name] < 10) {
			if (!admin) {
				const kpDeduction = E.evaluate(SKILL_KP, {
					'expr:skill_level': sums[skill.name] + 1,
					'expr:skill_difficulty': skill.difficulty,
					'expr:skill_ability': skill.positive
						? character.abilities[skill.ability]
						: 10 - character.abilities[skill.ability]
				}).result;
				if (kpDeduction <= remainingKp) {
					changes[name] = (changes[name] ?? 0) + 1;
					remainingKp -= kpDeduction;
				}
			} else {
				changes[name] = (changes[name] ?? 0) + 1;
			}
		}
	};

	const minus = (name: Skill) => {
		const skill: SkillInfo = Skill.get(name);
		if (sums[name] > 0 && (admin || (changes[name] ?? 0) >= 1)) {
			if (!admin) {
				const kpRebate = E.evaluate(SKILL_KP, {
					'expr:skill_level': sums[skill.name],
					'expr:skill_difficulty': skill.difficulty,
					'expr:skill_ability': skill.positive
						? character.abilities[skill.ability]
						: 10 - character.abilities[skill.ability]
				}).result;
				changes[name] = (changes[name] ?? 0) - 1;
				remainingKp += kpRebate;
			} else {
				changes[name] = (changes[name] ?? 0) - 1;
			}
		}
	};

	const submit = () => {
		const levelIdx = character.levels.length - 1;
		entries(changes).forEach(([key, value]) => {
			character.levels[levelIdx].skills[key] = (calculatedCharacter.skills[key] ?? 0) + value;
			if (character.levels[levelIdx].skills[key] == 0) {
				delete character.levels[levelIdx].skills[key];
			}
		});
		character.current.kp = remainingKp;
		dialog.close();
	};

	$: kpNeeded = Object.fromEntries(
		entries<Skill, Record<Skill, number>>(sums).map(([key, value]) => {
			const skill: SkillInfo = Skill.get(key);
			return [
				key,
				E.evaluate(SKILL_KP, {
					'expr:skill_level': sums[skill.name] + 1,
					'expr:skill_difficulty': skill.difficulty,
					'expr:skill_ability': skill.positive
						? character.abilities[skill.ability]
						: 10 - character.abilities[skill.ability]
				})
			];
		})
	);
</script>

<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			dialog.close();
		}
	}}
>
	<div class="content" on:click|stopPropagation>
		<Box title={$_('character:skills')} background={'#eeffee'}>
			<div>
				<div class="scrollable">
					<CircleGroup
						rows={Skill.list().map((s) => ({ name: s.name, subName: s.ability }))}
						values={calculatedCharacter.skills}
						newValues={sums}
						max={10}
						editable
						{plus}
						{minus}
					>
						<span slot="extra" let:key>
							{#if !admin}
								<ExpressionTooltip expr={kpNeeded[key]} />
							{/if}
						</span>
					</CircleGroup>
				</div>
				<div>
					<span>{$_('character:kp')}</span>
					<span>{remainingKp}</span>
					<button on:click={submit}>Submit</button>
				</div>
			</div>
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

	.scrollable {
		overflow-y: scroll;
		max-height: 10em;
	}
</style>
