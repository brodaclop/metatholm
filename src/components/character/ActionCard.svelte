<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';
	import {
		type Action,
		type ActionVariant,
		type ActionRange,
		ACTION_VARIANT_PROPERTIES
	} from '../../model/Action';
	import { entries, group } from '../../model/InfoList';
	import GiShieldReflect from 'svelte-icons/gi/GiShieldReflect.svelte';
	import GiSpinningSword from 'svelte-icons/gi/GiSpinningSword.svelte';
	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import type { Character } from '../../model/Karakter';

	export let action: Action | undefined = undefined;
	export let isSelectable: ((variant: ActionVariant) => boolean) | undefined = undefined;
	export let select: (variant: ActionVariant) => void = () => {};
	export let range: ActionRange | undefined = undefined;
	export let skills: Character['skills'] | undefined = undefined;

	let current: ActionVariant | undefined = undefined;

	$: sorted = group(
		[...(action?.variants ?? [])].sort((a, z) => a.name.localeCompare(z.name)),
		(v) => ACTION_VARIANT_PROPERTIES[v.name].range ?? 'any-range'
	);
</script>

<Box flavour="action-card" title={action?.name ?? ''}>
	<slot name="title" slot="title"
		>{#if action}{$_(action.name)}{/if}</slot
	>
	<div class="ranges">
		{#each entries(sorted) as [currentDistance, variants]}
			{#if range === undefined || range === currentDistance || currentDistance === 'any-range'}
				<div class="title">
					<Box flavour="action-distance" title={`label:${currentDistance}`} />
					{#each variants as variant}
						{@const selectable = isSelectable?.(variant.name)}
						<Box
							flavour={isSelectable && !selectable
								? 'action-variant-unselectable'
								: current === variant.name
								? 'action-variant-selected'
								: 'action-variant-selectable'}
							on:mouseenter={() => {
								if (selectable) {
									current = variant.name;
								}
							}}
							on:mouseleave={() => (current = undefined)}
							on:click={() => {
								if (current) {
									select(current);
									current = undefined;
								}
							}}
						>
							<div slot="title" class={ACTION_VARIANT_PROPERTIES[variant.name].type}>
								<LoreInfoIcon id={variant.name} params={{ skills, weapon: action?.weapon }} />
								<span class="type-icon">
									{#if ACTION_VARIANT_PROPERTIES[variant.name].type === 'action'}
										<GiSpinningSword />
									{:else}
										<GiShieldReflect />
									{/if}
								</span>
								{$_(variant.name)}
							</div>
							{#each variant.rolls as roll}
								<div class="row">
									<span class="label">{$_(roll.name)}</span>
									<span class="value">
										{#if typeof roll.roll !== 'number' && 'result' in roll.roll}
											<ExpressionTooltip expr={roll.roll} text={roll.rollString} />
										{:else}
											<ExpressionWidget expr={roll.roll} />
										{/if}
									</span>
								</div>
							{/each}
						</Box>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</Box>

<style>
	.ranges {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	span {
		white-space: nowrap;
	}

	.label {
		flex-basis: 90%;
		white-space: nowrap;
		font-weight: bold;
		padding-right: 0.5em;
	}

	.value {
		text-align: right;
	}

	span:not(.label) {
		flex-basis: 10%;
	}

	.type-icon {
		height: 1em;
		display: inline-block;
		vertical-align: text-bottom;
	}

	.action {
		color: cornflowerblue;
	}

	.reaction {
		color: coral;
	}
</style>
