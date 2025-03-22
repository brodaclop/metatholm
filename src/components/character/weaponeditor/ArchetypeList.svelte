<script lang="ts">
	import { ActionGroup, type WeaponTemplateVariant } from '../../../model/Action';
	import { _, locale } from 'svelte-i18n';
	import { WEAPON_LIST, type WeaponListEntry } from '../../../model/WeaponList';
	import DialogBox from '../../elements/DialogBox.svelte';
	import { createEventDispatcher } from 'svelte';
	import DeleteButton from '../../elements/DeleteButton.svelte';
	import { keys } from '../../../model/InfoList';

	$: langKey = ($locale ?? 'en') as 'hu' | 'en';

	const dispatch = createEventDispatcher();

	const ACTIONS: Record<ActionGroup, Array<WeaponTemplateVariant>> = {
		'actions:attacking': ['action:attack', 'action:attack-cq', 'action:attack-range'],
		'actions:defending': ['action:defend', 'action:defend-cq', 'action:defend-range'],
		'actions:positioning': [
			'action:close-in',
			'action:disengage',
			'action:keep-close',
			'action:keep-away'
		],
		'actions:tricks': [
			'action:hidden-weapon',
			'action:knockout',
			'action:spin-behind',
			'action:trip'
		]
	};

	const ACTION_LIST = Object.values(ACTIONS).flat();

	let showModal = false;

	$: weapons = langKey
		? WEAPON_LIST.sort((a, z) => a.name[langKey].localeCompare(z.name[langKey])).sort((a, z) =>
				$_(a.skill).localeCompare($_(z.skill))
		  )
		: [];

	export let archetype: WeaponListEntry | null;
</script>

<button on:click={() => (showModal = true)}
	>{$_('label:weapon:archetype')}: {archetype ? archetype.name[langKey] : '-'}</button
>
<DeleteButton
	disabled={!archetype}
	on:click={() => {
		archetype = null;
		dispatch('change', null);
	}}
/>

<DialogBox
	title="label:weapon:archetype"
	close={() => {
		showModal = false;
	}}
	{showModal}
	flavour="inventory"
>
	<table class="standard">
		<thead>
			<tr>
				<th rowspan="2">{$_('label:weapon:archetype')}</th>
				<th rowspan="2">{$_('weapon:hands')}</th>
				<th rowspan="2">{$_('weapon:reach')}</th>
				{#each keys(ACTIONS) as group}
					<th colspan={ACTIONS[group].length}>{$_(group)}</th>
				{/each}
			</tr>
			<tr>
				{#each ACTION_LIST as action}
					<th>{$_(action)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each weapons as weapon, idx}
				{@const newSkill = weapons[idx - 1]?.skill !== weapon.skill}
				{#if newSkill}
					<tr class="skillrow">
						<th colspan={ACTION_LIST.length + 3}>{$_(weapon.skill)}</th>
					</tr>
				{/if}
				<tr>
					<th
						><button
							class="select"
							title={weapon.description[langKey]}
							on:click={() => {
								archetype = weapon;
								showModal = false;
								dispatch('change', weapon);
							}}>{weapon.name[langKey]}</button
						></th
					>
					<td>{weapon.hands}</td>
					<td>{weapon.reach}</td>
					{#each ACTION_LIST as action}
						<td>{weapon.actions[action] ?? '-'}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</DialogBox>

<style>
	button.select {
		height: 100%;
		width: 100%;
	}

	.skillrow th {
		text-align: center;
	}
</style>
