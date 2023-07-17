<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let changes = 0;

	$: if (data.character) {
		changes = changes + 1;
	}

	$: if (changes >= 2) {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(data.character));
		changes = 0;
		fetch('?/saveCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		}).then(() => invalidate('db:characterlist'));
	}

	const deleteCharacter = () => {
		const body: FormData = new FormData();
		body.set('character', JSON.stringify(data.character));
		changes = 0;
		fetch('?/deleteCharacter', {
			method: 'POST',
			body,
			headers: {
				'x-sveltekit-action': 'true'
			}
		}).then(() => invalidate('db:characterlist'));
	};

	import CharacterSheet from '../../../components/character/CharacterSheet.svelte';
	import { invalidate } from '$app/navigation';
	import type { Character } from '../../../model/Karakter';

	// let character: Character = {
	// 	id: '1',
	// 	name: 'Teszt Kar',
	// 	background: 'background:assassin',
	// 	species: 'species:elf',
	// 	abilities: {
	// 		'ability:build': 3,
	// 		'ability:activity': 5,
	// 		'ability:presence': 2,
	// 		'ability:magic': 4
	// 	},
	// 	current: {
	// 		ep: 5,
	// 		mp: 3,
	// 		fp: 7
	// 	},
	// 	levels: [
	// 		{
	// 			fpRoll: 6,
	// 			skills: {
	// 				'skill:brawling': 4,
	// 				'skill:strength': 5,
	// 				'skill:endurance': 6,
	// 				'skill:magic_force': 3,
	// 				'skill:focus_elemental': 3
	// 			}
	// 		},
	// 		{
	// 			fpRoll: 2,
	// 			skills: {
	// 				'skill:brawling': 5,
	// 				'skill:knives': 4
	// 			}
	// 		}
	// 	]
	// };

	// console.log('data', data);
</script>

<div>
	<CharacterSheet bind:character={data.character} {deleteCharacter} />
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
