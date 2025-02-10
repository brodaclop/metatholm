<script lang="ts">
	import { Popover } from 'svelte-smooth-popover';
	import Lore from '../Lore.svelte';
	import { getContext } from 'svelte';

	export let href: string = '';
	export let title: string | undefined = undefined;

	const bookMode: boolean = getContext('bookMode') ?? false;

	$: effectiveHref = `/lore/${href}`;
</script>

{#if bookMode}
	<a href="#{href}" {title}><slot /></a>
{:else if href.startsWith('+')}
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="#" {title}>
		<slot />
		<Popover
			open={false}
			showOnClick={true}
			borderRadius={10}
			caretBg="var(--default-border-c)"
			hideOnExternalClick={true}
		>
			<div style:max-width="80vw">
				<Lore id={href.slice(1)} />
			</div>
		</Popover>
	</a>
{:else}
	<a href={effectiveHref} {title}><slot /></a>
{/if}
