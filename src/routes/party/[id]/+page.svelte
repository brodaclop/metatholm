<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Box from '../../../components/character/Box.svelte';
	import { _ } from 'svelte-i18n';
	import IconButton from '../../../components/elements/IconButton.svelte';
	import MdExitToApp from 'svelte-icons/md/MdExitToApp.svelte';
	import GiRollingDices from 'svelte-icons/gi/GiRollingDices.svelte';
	import MdArrowUpward from 'svelte-icons/md/MdArrowUpward.svelte';
	import MdArrowDownward from 'svelte-icons/md/MdArrowDownward.svelte';
	import { enhance } from '$app/forms';
	import DeleteButton from '../../../components/elements/DeleteButton.svelte';
	export let data: PageData;

	$: currentUser = data.user?.id;
	$: amIadmin = data.users.some((u) => u.id === currentUser && u.role === 'admin');
	$: areThereOtherAdmins = data.users.some((u) => u.id !== currentUser && u.role === 'admin');
</script>

<Box flavour="lore">
	<span slot="title">
		{`${$_('label:parties:party')} : ${data.party.name} (${$_(
			amIadmin ? 'label:parties:admin' : 'label:parties:player'
		)})`}
		<form method="POST" action="?/closeParty" use:enhance>
			<DeleteButton disabled={data.users.length > 1 || !amIadmin} />
		</form>
	</span>
	{$_('label:parties:invite')}:
	<input type="text" value={new URL(`/join/${data.party.inviteCode}`, $page.url.toString())} />

	<ul>
		{#each data.users as user}
			{@const targetIsCurrentUser = user.id === currentUser}
			{@const targetIsAdmin = user.role === 'admin'}
			<li>
				{user.name} ({user.role})
				{#if amIadmin && (!targetIsCurrentUser || areThereOtherAdmins)}
					<form method="POST" action="?/setRole" use:enhance>
						<input type="hidden" name="userId" value={user.id} />
						<input type="hidden" name="role" value={targetIsAdmin ? 'player' : 'admin'} />
						<IconButton title={`label:parties:${targetIsAdmin ? 'demote' : 'promote'}`} withText>
							{#if targetIsAdmin}<MdArrowDownward />{:else}<MdArrowUpward />{/if}
						</IconButton>
					</form>
				{/if}

				{#if (targetIsCurrentUser && areThereOtherAdmins) || (!targetIsCurrentUser && amIadmin)}
					<form method="POST" action="?/leaveParty" use:enhance>
						<input type="hidden" name="userId" value={user.id} />

						<IconButton
							title={`label:parties:${targetIsCurrentUser ? 'leave' : 'kickout'}`}
							withText
							color="var(--delete-icon-c)"
							><MdExitToApp />
						</IconButton>
					</form>
				{/if}
			</li>
		{/each}
	</ul>
	<form method="POST" action="?/regenerateInvite" use:enhance>
		<IconButton title={'label:parties:new_invite'} withText>
			<GiRollingDices />
		</IconButton>
	</form>
</Box>

<style>
	form {
		display: inline-block;
	}

	input[type='text'] {
		width: 20rem;
	}
</style>
