<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ExpressionTooltip from '../expression/ExpressionTooltip.svelte';
	import Box from './Box.svelte';
	import ExpressionWidget from '../expression/ExpressionWidget.svelte';
	import {
		type Action,
		type ActionVariant,
		type ActionRange,
		ACTION_VARIANT_PROPERTIES,
		RANGE_ORDER
	} from '../../model/Action';
	import { entries, group } from '../../model/InfoList';
	import GiShieldReflect from 'svelte-icons/gi/GiShieldReflect.svelte';
	import GiSpinningSword from 'svelte-icons/gi/GiSpinningSword.svelte';
	import MdExpandMore from 'svelte-icons/md/MdExpandMore.svelte';
	import MdExpandLess from 'svelte-icons/md/MdExpandLess.svelte';

	import LoreInfoIcon from '../LoreInfoIcon.svelte';
	import type { Character } from '../../model/Karakter';
	import type { BoxFlavour } from '../BoxFlavours';
	import { Spell } from '../../model/Spell';
	import IconButton from '../elements/IconButton.svelte';
	import SkillIcon from './SkillIcon.svelte';

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

	let flavour: BoxFlavour;

	$: {
		if (action?.weapon) {
			flavour = 'action-card-weapon';
		} else if (action?.spell) {
			flavour = 'action-card-spell';
		} else {
			flavour = 'action-card';
		}
	}

	$: spellTarget =
		action?.spell !== undefined
			? `${$_('label:spell_target')}: ${$_(Spell.get(action.spell).target)}`
			: undefined;

	export let expanded = false;

	$: skill = action?.weapon?.skill ?? (action?.spell ? Spell.get(action.spell).skill : undefined);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<Box {flavour} title={action?.name ?? ''}>
	<slot name="title" slot="title">
		<div class="titlerow">
			<div class="left">
				{#if skill}
					<div class="skill-icon">
						<SkillIcon {skill} />
					</div>
				{/if}
			</div>
			<div class="centre">
				{#if action}
					<span on:click={() => (expanded = !expanded)}>
						{$_(action.name)}
					</span>
				{/if}
			</div>
			<div class="right">
				{#if action}<LoreInfoIcon
						id={action.weapon?.skill ?? action.spell ?? action.name}
					/>{/if}<IconButton title="expand/collaps" on:click={() => (expanded = !expanded)}>
					{#if expanded}<MdExpandLess />{:else}<MdExpandMore />{/if}
				</IconButton>
			</div>
		</div>
	</slot>
	{#if expanded}
		<div class="ranges">
			{#each RANGE_ORDER as currentDistance}
				{@const variants = sorted[currentDistance]}
				{#if variants}
					{#if range === undefined || range === currentDistance || currentDistance === 'any-range'}
						<div class="title">
							<Box flavour="action-distance" title={spellTarget ?? `label:${currentDistance}`} />
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
				{/if}
			{/each}
		</div>
	{/if}
</Box>

<style>
	.titlerow {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-between;
	}

	.titlerow .left {
		text-align: left;
	}

	.titlerow .centre {
		text-align: center;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.titlerow .right {
		text-align: right;
	}

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
		font-weight: var(--font-weight-bold);
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
		color: var(--actioncard-action-c);
	}

	.reaction {
		color: var(--actioncard-reaction-c);
	}

	.skill-icon {
		color: var(--actioncard-skill-icon-c);
		width: 1em;
		display: inline-block;
		vertical-align: middle;
	}
</style>
