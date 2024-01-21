<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { E } from '../../logic/Expression';
	import { entries, group, keys } from '../../model/InfoList';
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
	export let admin = false;

	let abilityLabels: Record<string, string> = {};

	_.subscribe((mf) => {
		abilityLabels['ability:build'] = mf('ability:build');
		abilityLabels['ability:presence'] = mf('ability:presence');
		abilityLabels['ability:activity'] = mf('ability:activity');
		abilityLabels['ability:magic'] = mf('ability:magic');
	});

	let changes: Partial<Record<Skill, number>> = {};
	$: if (character) {
		changes = {};
	}
	$: remainingKp = character.current.kp;
	$: sums = Object.fromEntries(
		Skill.list().map((s) => [s.name, (character.skills[s.name] ?? 0) + (changes[s.name] ?? 0)])
	);

	const plus = (name: Skill) => {
		const skill: SkillInfo = Skill.get(name);
		if (sums[name] < 10) {
			if (!admin) {
				const ability =
					skill.ability === 'skill_type:general'
						? 10
						: skill.positive
						? character.abilities[skill.ability]
						: 10 - character.abilities[skill.ability];
				const kpDeduction = E.evaluate(SKILL_KP, {
					'expr:skill_level': sums[skill.name] + 1,
					'expr:skill_difficulty': skill.difficulty,
					'expr:skill_ability': ability
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
				const ability =
					skill.ability === 'skill_type:general'
						? 10
						: skill.positive
						? character.abilities[skill.ability]
						: 10 - character.abilities[skill.ability];
				const kpRebate = E.evaluate(SKILL_KP, {
					'expr:skill_level': sums[skill.name],
					'expr:skill_difficulty': skill.difficulty,
					'expr:skill_ability': ability
				}).result;
				changes[name] = (changes[name] ?? 0) - 1;
				remainingKp += kpRebate;
			} else {
				changes[name] = (changes[name] ?? 0) - 1;
			}
		}
	};

	const submit = () => {
		entries(changes).forEach(([key, value]) => {
			character.skills[key] = (character.skills[key] ?? 0) + value;
			if (character.skills[key] == 0) {
				delete character.skills[key];
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
					'expr:skill_ability':
						skill.ability === 'skill_type:general'
							? 10
							: skill.positive
							? character.abilities[skill.ability]
							: 10 - character.abilities[skill.ability]
				})
			];
		})
	);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="content" on:click|stopPropagation>
		<Box title="character:skills" flavour="skills">
			<div class="buttonbar">
				{#each keys(group(Skill.list(), (s) => s.type)) as type}
					<button on:click={() => document.getElementById(type)?.scrollIntoView()}
						>{$_(type)}</button
					>
				{/each}
			</div>
			<div class="type-container">
				{#each entries(group(Skill.list(), (s) => s.type)) as [type, skillList]}
					<div class="type-list" id={type}>
						<h3>{$_(type)}</h3>
						{#each entries(group( skillList, (s) => String(s.difficulty) )) as [difficulty, skillList2]}
							<h4>{$_(`label:difficulty:${difficulty}`)}</h4>
							<div class="skill-group">
								<CircleGroup
									rows={skillList2.map((s) => ({
										name: s.name,
										subName:
											s.ability === 'skill_type:general'
												? 'skill_type:general'
												: (s.positive ? '+' : '-') + abilityLabels[s.ability]
									}))}
									values={character.skills}
									newValues={sums}
									inlineLore
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
						{/each}
					</div>
				{/each}
			</div>
			<div class="footer">
				<span>{$_('character:kp')}: {remainingKp}</span>
				<button on:click={submit}>OK</button>
			</div>
		</Box>
	</div>
</dialog>

<style>
	.footer {
		display: flex;
		justify-content: space-between;
	}

	dialog {
		max-width: fit-content;
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

	.type-container {
		height: 70vh;
		overflow-y: scroll;
	}

	.buttonbar {
		text-align: center;
		margin-bottom: 0.4em;
	}

	.skill-group {
		margin-left: 1em;
		margin-right: 1em;
	}

	h4 {
		margin-bottom: 0.2em;
	}

	h3 {
		text-align: center;
		margin-top: 0.2em;
	}

	.type-list {
		border-bottom: 1px dotted black;
		padding-bottom: 0.5em;
	}
</style>
