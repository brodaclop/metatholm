<script lang="ts">
	import GiPerson from 'svelte-icons/gi/GiPerson.svelte';
	import GiOak from 'svelte-icons/gi/GiOak.svelte';
	import GiTwoShadows from 'svelte-icons/gi/GiTwoShadows.svelte';
	import GiBoltSpellCast from 'svelte-icons/gi/GiBoltSpellCast.svelte';
	import GiPrayer from 'svelte-icons/gi/GiPrayer.svelte';
	import GiMagicGate from 'svelte-icons/gi/GiMagicGate.svelte';
	import GiTemplarShield from 'svelte-icons/gi/GiTemplarShield.svelte';
	import GiFlangedMace from 'svelte-icons/gi/GiFlangedMace.svelte';
	import GiHighShot from 'svelte-icons/gi/GiHighShot.svelte';
	import GiHighKick from 'svelte-icons/gi/GiHighKick.svelte';
	import GiStrong from 'svelte-icons/gi/GiStrong.svelte';
	import GiCrossbow from 'svelte-icons/gi/GiCrossbow.svelte';
	import GiPunch from 'svelte-icons/gi/GiPunch.svelte';
	import GiBowieKnife from 'svelte-icons/gi/GiBowieKnife.svelte';
	import GiGlaive from 'svelte-icons/gi/GiGlaive.svelte';
	import GiCheckedShield from 'svelte-icons/gi/GiCheckedShield.svelte';
	import GiBroadsword from 'svelte-icons/gi/GiBroadsword.svelte';
	import GiStarShuriken from 'svelte-icons/gi/GiStarShuriken.svelte';
	import type { Skill } from '../../model/Skills';
	import { _ } from 'svelte-i18n';

	export let skill: Skill | undefined;

	const SKILL_ICONS: Partial<Record<Skill, ConstructorOfATypedSvelteComponent>> = {
		'skill:body_focus': GiPerson,
		'skill:nature_focus': GiOak,
		'skill:shadow_focus': GiTwoShadows,
		'skill:elemental_focus': GiBoltSpellCast,
		'skill:spirit_focus': GiPrayer,
		'skill:spacetime_focus': GiMagicGate,
		'skill:life_focus': GiTemplarShield,
		'skill:maces': GiFlangedMace,
		'skill:bows': GiHighShot,
		'skill:martial_arts': GiHighKick,
		'skill:brawling': GiStrong,
		'skill:crossbows': GiCrossbow,
		'skill:fistfighting': GiPunch,
		'skill:knives': GiBowieKnife,
		'skill:polearms': GiGlaive,
		'skill:shields': GiCheckedShield,
		'skill:swords': GiBroadsword,
		'skill:throwing': GiStarShuriken
	};
</script>

{#if skill && SKILL_ICONS[skill]}
	<svelte:component this={SKILL_ICONS[skill]} title={$_(skill)} />
{/if}
