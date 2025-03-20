<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Spirit } from '../../../model/Spirits';
	import { entries } from '../../../model/InfoList';
</script>

<table class="standard wide">
	<thead>
		<tr>
			<th>{$_('label:spirit_animal')}</th>
			<th>{$_('label:spirit_manifestation')}</th>
			<th>{$_('label:spirit_effect')}</th>
		</tr>
	</thead>
	<tbody>
		{#each Spirit.list() as animal}
			{@const manifestations = entries(animal.manifestations)}
			{#each manifestations as manifestation, idx}
				<tr>
					{#if idx === 0}
						<th rowspan={manifestations.length}>{$_(animal.name)}</th>
					{/if}
					<td>{$_(manifestation[0])}</td>
					<td>{$_(manifestation[1])}</td>
				</tr>
			{/each}
		{/each}
	</tbody>
</table>
