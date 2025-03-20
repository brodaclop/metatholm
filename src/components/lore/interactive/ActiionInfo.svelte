<script lang="ts">
	import { ACTION_VARIANT_PROPERTIES, type ActionVariant } from '../../../model/Action';
	import { entries } from '../../../model/InfoList';
	import PropertyList from '../PropertyList.svelte';

	export let id: ActionVariant;
	export let bookMode: boolean;

	$: info = ACTION_VARIANT_PROPERTIES[id];
	$: counteredBy = entries(ACTION_VARIANT_PROPERTIES)
		.filter(([, value]) => value.reactionTo?.includes(id))
		.map(([key]) => key);

	$: properties = [
		{
			type: 'text' as 'text',
			title: 'label:type',
			value: info.type === 'action' ? 'label:action' : 'label:reaction'
		},
		{
			type: 'text' as 'text',
			title: 'label:range',
			value: `label:${info.range ?? 'any-range'}`
		},
		...(info.reactionTo
			? [
					{
						type: 'link' as 'link',
						title: 'label:counters',
						bookMode: bookMode,
						targets: info.reactionTo
					}
			  ]
			: []),
		...(counteredBy.length > 0
			? [
					{
						type: 'link' as 'link',
						title: 'label:countered-by',
						bookMode: bookMode,
						targets: counteredBy
					}
			  ]
			: [])
	];
</script>

<PropertyList {properties} />
