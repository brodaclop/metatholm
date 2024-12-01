<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { E } from '../../logic/Expression';
	import { entries, group, keys, sort } from '../../model/InfoList';
	import type { Character } from '../../model/Karakter';
	import { SKILL_KP } from '../../model/Rules';
	import { Skill, type SkillInfo } from '../../model/Skills';
	import CircleGroup from '../elements/CircleGroup.svelte';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import DialogBox from '../elements/DialogBox.svelte';

	export let showModal: boolean; // boolean
	export let close: () => void;
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
		close();
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

<DialogBox {close} {showModal} title="character:skills" flavour="skills">
	<div class="buttonbar">
		{#each keys(group(Skill.list(), (s) => s.type)) as type}
			<button on:click={() => document.getElementById(type)?.scrollIntoView()}>{$_(type)}</button>
		{/each}
	</div>
	<div class="type-container">
		<table>
			{#each entries(group(Skill.list(), (s) => s.type)) as [type, skillList]}
				<tbody class="type-list" id={type}>
					<tr>
						<th colspan="3">
							<h3>{$_(type)}</h3>
						</th>
					</tr>
					{#each entries(group( skillList, (s) => String(s.difficulty) )) as [difficulty, skillListForDifficulty]}
						{@const list = sort(skillListForDifficulty, 'name', $_)}
						<tr>
							<th colspan="3">
								<h4>{$_(`weapon:difficulty:${difficulty}`)}</h4>
							</th>
						</tr>
						<CircleGroup
							wrapInTable={false}
							rows={list.map((s) => ({
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
							canPlus={(key) => kpNeeded[key].result <= remainingKp}
							canMinus={(key) => (changes[key] ?? 0) > 0}
							editable
							{plus}
							{minus}
						>
							<span slot="extra" let:key class="points">
								{#if !admin}
									&nbsp;
									<ExpressionTooltip expr={kpNeeded[key]} />
								{/if}
							</span>
						</CircleGroup>
					{/each}
				</tbody>
			{/each}
		</table>
	</div>
	<div class="footer">
		<span>{$_('character:kp')}: {remainingKp}</span>
		<button on:click={submit}>OK</button>
	</div>
</DialogBox>

<style>
	.footer {
		display: flex;
		justify-content: space-between;
	}

	.type-container {
		height: 45vh;
		overflow-y: scroll;
	}

	.buttonbar {
		text-align: center;
		margin-bottom: 0.4em;
	}

	h4 {
		margin-bottom: 0.2em;
	}

	h3 {
		text-align: center;
		margin-top: 0.2em;
	}

	.type-list {
		border-bottom: 1px dotted var(--default-border-c);
		padding-bottom: 0.5em;
	}

	.points {
		display: inline-block;
		text-align: right;
		width: 100%;
	}
</style>
