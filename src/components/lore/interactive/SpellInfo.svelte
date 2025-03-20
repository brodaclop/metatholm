<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Spell } from '../../../model/Spell';
	import PropertyList from '../PropertyList.svelte';

	export let id: Spell;
	export let bookMode: boolean;

	$: info = Spell.get(id);
</script>

<PropertyList
	properties={[
		{
			type: 'text',
			title: 'expr:spell_level',
			value: info.level
		},
		{
			type: 'text',
			title: 'expr:spell_speed',
			value: info.speed
		},
		{
			type: 'text',
			title: 'label:spell_target',
			value: info.target
		},
		{
			type: 'text',
			title: 'label:spell_duration',
			value: info.duration
		},
		{
			type: 'link',
			title: 'weapon:skill',
			targets: [info.skill],
			bookMode
		}
	]}
/>
