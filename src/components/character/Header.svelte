<script lang="ts">
	import type { Character } from '../../model/Karakter';
	import { _ } from 'svelte-i18n';

	export let character: Character;
</script>

{$_('label:name')}
<input type="text" bind:value={character.name} />
