<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { Spell } from '../../../model/Spell';

	export let id: Spell;

	$: info = Spell.get(id);
</script>

<ul>
	<li><b>{$_('expr:spell_level')}:</b> {info.level}</li>
	<li><b>{$_('expr:spell_speed')}:</b> {info.speed}</li>
	<li><b>{$_('weapon:skill')}:</b> <a href="/lore/{info.skill}">{$_(info.skill)}</a></li>
</ul>

<style>
	ul {
		padding: 0;
		list-style: none;
	}

	b {
		padding-right: 0.5em;
	}
</style>
