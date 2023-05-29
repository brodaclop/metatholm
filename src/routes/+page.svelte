<script>
	import ExpressionWidget from '../components/expression/ExpressionWidget.svelte';
	import Contest from '../components/Contest.svelte';
	import Harc from '../components/Harc.svelte';
	import Initiative from '../components/Initiative.svelte';
	import { Expression } from '../logic/Expression';
	import { TOTAL_FP } from '../model/Rules';
	import { Labels_en, Labels_hu } from '../model/Labels';

	import { _, getLocaleFromNavigator, isLoading, register, init, locale } from 'svelte-i18n';

	let lang = '';

	register('en', async () => Labels_en);
	register('hu', async () => Labels_hu);

	init({
		fallbackLocale: 'en',
		initialLocale: getLocaleFromNavigator()
	});

	$: lang && locale.set(lang);
</script>

{#if $isLoading}
	<p>Loading...</p>
{:else}
	<div>
		Language: <select bind:value={lang}>
			<option>en</option>
			<option>hu</option>
		</select>
	</div>

	<div>
		<ExpressionWidget expr={TOTAL_FP} />
	</div>

	<div>
		<ExpressionWidget
			expr={Expression.evaluate(TOTAL_FP, {
				'ability:build': 5,
				'ability:presence': 3,
				'skill:endurance': 6,
				'skill:pain_tolerance': 2,
				'expr:pp_roll': [9, 10],
				'character:level': 2
			})}
		/>
	</div>

	<Initiative />

	<Harc />

	<Contest />
{/if}
