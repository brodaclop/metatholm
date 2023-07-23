<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Skill } from '../../model/Skills';
	import Box from '../character/Box.svelte';
	import type { Ability } from '../../model/Abilities';
	import { SKILL_KP } from '../../model/Rules';
	import { E } from '../../logic/Expression';

	export let id: Skill;
	export let value: number | undefined = undefined;
	export let abilities: Record<Ability, number> | undefined = undefined;

	$: skill = Skill.get(id);
</script>

<Box background="white">
	<div slot="title">
		{$_('label:skill')}: {$_(skill.name)} <i>({$_(skill.type)})</i>
	</div>
	<table>
		<tbody>
			<tr>
				<th>{$_('label:difficulty')}</th>
				<td>{$_(`label:difficulty:${skill.difficulty}`)}</td>
			</tr>
			<tr>
				<th>{$_('label:ability')}</th>
				<td
					>{$_(skill.ability)}{skill.positive ? '+' : '-'}
					{#if abilities && skill.ability !== 'skill_type:general'}({abilities[
							skill.ability
						]}){/if}</td
				>
			</tr>
			<tr>
				<th>Skill progression:</th>
				<td>
					{#if skill.ability !== 'skill_type:general'}
						<table>
							<thead>
								<tr>
									<th>Skill level\Ability</th>
									{#each Array(11) as _, ability (ability)}
										{@const highlight = ability === abilities?.[skill.ability]}
										<th style:background-color={highlight ? 'red' : undefined}>{ability}</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each Array(10) as _, level (level)}
									{@const skillHighlight = level - 1 === value}
									<tr>
										<th style:background-color={skillHighlight ? 'green' : undefined}>{level}</th>
										{#each Array(11) as _, ability (ability)}
											{@const effectiveAbility = skill.positive ? ability : 10 - ability}
											{@const kp = E.evaluate(SKILL_KP, {
												'expr:skill_level': level + 1,
												'expr:skill_difficulty': skill.difficulty,
												'expr:skill_ability': effectiveAbility
											})}
											{@const abilityHighlight = ability === abilities?.[skill.ability]}
											<td
												style:background-color={abilityHighlight && skillHighlight
													? 'grey'
													: abilityHighlight
													? 'red'
													: skillHighlight
													? 'green'
													: undefined}>{kp.result}</td
											>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</Box>
