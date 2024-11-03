<script lang="ts">
	import type { PageData } from './$types';
	import Box from '../../components/character/Box.svelte';
	import { _ } from 'svelte-i18n';
	import IconButton from '../../components/elements/IconButton.svelte';
	import GiSwordSmithing from 'svelte-icons/gi/GiSwordSmithing.svelte';
	import MdSave from 'svelte-icons/md/MdSave.svelte';

	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<div class="container">
	<Box title="label:settings" flavour="lore">
		<form method="post" action="?/renameUser" use:enhance>
			{$_('label:name')}: <input type="text" name="name" value={data.user?.username} />
			<IconButton title="label:save">
				<MdSave />
			</IconButton>
		</form>
	</Box>

	<Box title="label:parties" flavour="lore">
		<div>
			{#each data.parties as party}
				<Box flavour="lore">
					<span slot="title">
						<a href="/party/{party.party.id}">{party.party.name}</a>
					</span>
				</Box>
			{/each}

			<div class="fullrow">
				<Box title="label:parties:new" flavour="lore">
					<form method="post" action="?/createParty" use:enhance>
						{$_('label:name')}: <input type="text" name="name" />
						<IconButton title="label:parties:new">
							<GiSwordSmithing />
						</IconButton>
					</form>
				</Box>
			</div>
		</div>
	</Box>
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
	}

	.fullrow {
		flex-basis: 100%;
	}
</style>
