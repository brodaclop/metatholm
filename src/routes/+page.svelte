<script lang="ts">
	import Lore from '../components/lore/Lore.svelte';
</script>

<div>
	<Lore id="world:concepts:vagabonds" includeTitlePrefix={false} />
	<!-- <Npc
		character={{
			name: 'Maklar lovag',
			ep: 13,
			fp: 58,
			dr: 2,
			magic_res: 0,
			reactions: 1,
			spot_hidden: 3,
			weapons: [
				{
					name: 'Kard',
					ap: 24,
					dmg: 4,
					disengageCloseIn: [0, 10],
					keepCloseKeepAway: [0, 25],
					attack: [10, 30, null],
					defend: [10, 25, 5]
				},
				{
					name: 'Ököl',
					ap: 22,
					dmg: 2,
					disengageCloseIn: [15, -5],
					keepCloseKeepAway: [10, null],
					attack: [20, null, null],
					defend: [15, 10, 0]
				},
				{
					name: 'Tőr',
					ap: 22,
					dmg: 3,
					disengageCloseIn: [20, 0],
					keepCloseKeepAway: [15, null],
					attack: [25, null, null],
					defend: [10, 15, 0]
				}
			]
		}}
	/>
	<br />
	<Npc
		character={{
			name: 'Fogdmeg',
			ep: 8,
			fp: 78,
			dr: 0,
			magic_res: 0,
			reactions: 2,
			spot_hidden: 1,
			weapons: [
				{
					name: 'Ököl',
					ap: 22,
					dmg: 2,
					disengageCloseIn: [15, -5],
					keepCloseKeepAway: [10, null],
					attack: [20, null, null],
					defend: [15, 10, 0]
				}
			]
		}}
	/> -->
	<!-- <button on:click={() => (editable = !editable)}>Edit</button>
	<Npc
		{editable}
		character={{
			name: 'Lori',
			ep: 14,
			maxEp: 14,
			fp: 118,
			maxFp: 118,
			dr: 1,
			magic_res: 2,
			reactions: 4,
			spot_hidden: 4,
			weapons: [
				{
					name: 'Kard',
					ap: 18,
					dmg: 4,
					disengageCloseIn: [10, 30],
					keepCloseKeepAway: [0, 35],
					attack: [10, 30, null],
					defend: [10, 35, 5]
				},
				{
					name: 'Ököl',
					ap: 22,
					dmg: 1,
					disengageCloseIn: [15, -5],
					keepCloseKeepAway: [30, null],
					attack: [30, null, null],
					defend: [20, 10, 0]
				},
				{
					name: 'Tőr',
					ap: 15,
					dmg: 2,
					disengageCloseIn: [25, 0],
					keepCloseKeepAway: [45, null],
					attack: [40, null, null],
					defend: [20, 10, 0]
				},
				{
					name: 'Nyílpuska',
					ap: 35,
					dmg: 5,
					disengageCloseIn: [null, null],
					keepCloseKeepAway: [null, null],
					attack: [null, null, 55],
					defend: [null, null, null]
				}
			],
			spells: [
				{
					name: 'spell:blunt_senses',
					ap: 25,
					strength: 3,
					count: 2,
					maxCount: 2
				},
				{
					name: 'spell:whispering_shadows',
					ap: 12,
					strength: 2,
					count: 1,
					maxCount: 1
				},
				{
					name: 'spell:darken',
					ap: 22,
					strength: 3,
					maxCount: 1,
					count: 1
				}
			],
			extra_skills: [
				{
					name: 'skill:hiding',
					level: 5
				},
				{
					name: 'skill:history',
					level: 4
				},
				{
					name: 'skill:geography',
					level: 5
				}
			],
			notes: ''
		}}
	/> -->

	<!-- <Harc /> -->
	<!-- <SkillLore
		skill="skill:martial_arts"
		value={3}
		abilities={{
			'ability:activity': 2,
			'ability:build': 3,
			'ability:presence': 1,
			'ability:magic': 4
		}}
	/> -->
</div>

<style>
	div {
		margin: 0.5em;
	}
</style>
