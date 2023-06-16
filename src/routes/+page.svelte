<script lang="ts">
	import ExpressionWidget from '../components/expression/ExpressionWidget.svelte';
	import Contest from '../components/Contest.svelte';
	import Harc from '../components/Harc.svelte';
	import Initiative from '../components/Initiative.svelte';
	import { E } from '../logic/Expression';
	import { TOTAL_FP } from '../model/Rules';
	import { Labels_en, Labels_hu } from '../model/Labels';

	import { _, getLocaleFromNavigator, isLoading, register, init, locale } from 'svelte-i18n';
	import SimulateCombat from '../components/SimulateCombat.svelte';
	import CalculateCombat from '../components/CalculateCombat.svelte';
	import SkillRolls from '../components/SkillRolls.svelte';
	import CharacterSheet from '../components/character/CharacterSheet.svelte';
	import type { Character } from '../model/Karakter';

	let lang = getLocaleFromNavigator()?.substring(0, 2);

	register('en', async () => Labels_en);
	register('hu', async () => Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: lang
	});

	$: lang && locale.set(lang);

	let character: Character = {
		id: '1',
		name: 'Teszt Kar',
		abilities: {
			'ability:build': 3,
			'ability:activity': 5,
			'ability:presence': 2,
			'ability:magic': 4
		},
		current: {
			ep: 5,
			mp: 3,
			fp: 7
		},
		levels: [
			{
				fpRoll: 6,
				skills: {
					'skill:brawling': 4,
					'skill:strength': 5,
					'skill:endurance': 6,
					'skill:magic_force': 3,
					'skill:focus_elemental': 3
				}
			},
			{
				fpRoll: 2,
				skills: {
					'skill:brawling': 5,
					'skill:knives': 4
				}
			}
		]
	};

	$: console.log('character', character);
</script>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<div>
		Language: <select bind:value={lang}>
			<option>en</option>
			<option>hu</option>
		</select>
	</div>

	<div>
		<CharacterSheet bind:character />
	</div>

	<div>
		<Contest />
	</div>

	<!-- 
	<div>
		<SimulateCombat />
	</div>

	<div>
		<CalculateCombat />
	</div>

	<div>
		<ExpressionWidget expr={TOTAL_FP} />
	</div>

	<div>
		<ExpressionWidget
			expr={E.evaluate(TOTAL_FP, {
				'ability:build': 5,
				'ability:presence': 3,
				'skill:endurance': 6,
				'skill:pain_threshold': 2,
				'expr:pp_roll': [9, 10],
				'character:level': 2
			})}
		/>
	</div>

	<div>
		<SkillRolls />
	</div>

	<Initiative />

	<Harc />

	<Contest /> -->
{/if}
