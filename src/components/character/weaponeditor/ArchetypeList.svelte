<script lang="ts">
	import { type WeaponTemplateVariant } from '../../../model/Action';
	import { _, locale } from 'svelte-i18n';
	import { WEAPON_LIST, type WeaponListEntry } from '../../../model/WeaponList';
	import DialogBox from '../../elements/DialogBox.svelte';
	import { createEventDispatcher } from 'svelte';
	import DeleteButton from '../../elements/DeleteButton.svelte';

	$: langKey = ($locale ?? 'en') as 'hu' | 'en';

	const dispatch = createEventDispatcher();

	const ACTIONS: Record<string, Array<WeaponTemplateVariant>> = {
		attack: ['action:attack', 'action:attack-cq', 'action:attack-range'],
		defend: ['action:defend', 'action:defend-cq', 'action:defend-range'],
		positioning: ['action:close-in', 'action:disengage', 'action:keep-close', 'action:keep-away'],
		tricks: ['action:hidden-weapon', 'action:knockout', 'action:spin-behind', 'action:trip']
	};

	const ACTION_LIST = Object.values(ACTIONS).flat();

	let showModal = false;

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
				{#each Object.keys(ACTIONS) as group}
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
			{#each WEAPON_LIST as weapon}
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
</style>
