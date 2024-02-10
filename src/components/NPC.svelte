<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { NPC } from '../model/npc/Npc';
	import Circles from './elements/Circles.svelte';
	import Damage from './elements/Damage.svelte';
	import OptionalInput from './elements/OptionalInput.svelte';
	import IconButton from './elements/IconButton.svelte';
	import DeleteButton from './elements/DeleteButton.svelte';
	import GiAnvil from 'svelte-icons/gi/GiAnvil.svelte';
	import { Skill } from '../model/Skills';
	import { Spell } from '../model/Spell';
	import Box from './character/Box.svelte';
	import LoreInfoIcon from './LoreInfoIcon.svelte';

	export let character: NPC;
	export let editable = false;

	//TODO: notes
	//TODO: spell headings

	$: tableMax = Math.max(character.spells.length, character.extra_skills.length);

	const skillNames = Skill.list()
		.map((i) => i.name)
		.sort((a, z) => $_(a).localeCompare($_(z)));
	const spellNames = Spell.list()
		.map((i) => i.name)
		.sort((a, z) => $_(a).localeCompare($_(z)));

	const format = $_;

	$: if (editable) {
		character.fp = character.maxFp;
		character.ep = character.maxEp;
		character.spells.forEach((s) => (s.count = s.maxCount));
		character.spells = character.spells;
	}
</script>

<Box flavour="character-sheet">
	<table class="npc">
		<thead>
			<tr>
				<th colspan="7" class="title nopadding">
					<div class="titlebar">
						<div><slot name="leftbutton" /></div>
						<OptionalInput type="text" bind:value={character.name} {editable} />
						<div><slot name="rightbutton" /></div>
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="nopadding" colspan="7">
					<div class="points">
						<div class="grow">
							<div>
								{$_('character:ep')}: {character.ep} /
								<OptionalInput type="number" bind:value={character.maxEp} {editable} />
							</div>
							{#if !editable}
								<div>
									<Damage
										selected={(value) => {
											character.ep = character.ep - value;
										}}
									/>
								</div>
							{/if}
						</div>
						<div class="grow">
							<div>
								{$_('character:fp')}: {character.fp} /
								<OptionalInput type="number" bind:value={character.maxFp} {editable} />
							</div>
							{#if !editable}
								<div>
									<Damage
										selected={(value) => {
											const dmg = Math.max(0, value - character.dr);
											character.fp = character.fp - dmg;
											character.ep = character.ep - Math.floor(dmg / 10);
										}}
									/>
								</div>
							{/if}
						</div>
						<div class="bold">
							<div>{$_('armour:dr')}</div>
							<div><OptionalInput type="number" bind:value={character.dr} {editable} /></div>
						</div>
						<div class="bold">
							<div>{$_('skill:magic_resistance')}</div>
							<div><OptionalInput type="number" bind:value={character.magic_res} {editable} /></div>
						</div>
						<div class="bold">
							<div>{$_('skill:spot_hidden')}</div>
							<div>
								<OptionalInput
									type="number"
									bind:value={character.spot_hidden}
									{editable}
									clipboardText={`Spot hidden: {${character.spot_hidden}d10!}`}
								/>
							</div>
						</div>
						<div class="bold">
							<div>{$_('skill:reactions')}</div>
							<div>
								<OptionalInput
									type="number"
									bind:value={character.reactions}
									{editable}
									clipboardText={`Reactions: {${character.reactions}d10!}`}
								/>
							</div>
						</div>
					</div>
				</td>
			</tr>
		</tbody>
		<tbody>
			<tr>
				<th>{$_('label:weapon')}</th>
				<th>{$_('action:ap')}</th>
				<th>{$_('action:attack')}</th>
				<th>{$_('action:defend')}</th>
				<th>{$_('action:disengage')} / {$_('action:close-in')}</th>
				<th>{$_('action:keep-close')} / {$_('action:keep-away')}</th>
				<th>{$_('label:damage')}</th>
			</tr>
			{#each character.weapons as weapon, weaponIdx}
				<tr class="striped">
					<td><OptionalInput type="text" bind:value={weapon.name} {editable} /></td>
					<td><OptionalInput type="number" bind:value={weapon.ap} {editable} /></td>
					<td>
						{#each weapon.attack as value, i}
							<OptionalInput
								type="number"
								bind:value
								{editable}
								clipboardText={`Attack: {1d100+${value}}`}
							/>
							{#if i < weapon.attack.length - 1} / {/if}
						{/each}
					</td>
					<td>
						{#each weapon.defend as value, i}
							<OptionalInput
								type="number"
								bind:value
								{editable}
								clipboardText={`Defend: {1d100+${value}}`}
							/>
							{#if i < weapon.defend.length - 1} / {/if}
						{/each}
					</td>
					<td>
						{#each weapon.disengageCloseIn as value, i}
							<OptionalInput
								type="number"
								bind:value
								{editable}
								clipboardText={`Disengage/Close in: {1d100+${value}}`}
							/>
							{#if i < weapon.disengageCloseIn.length - 1} / {/if}
						{/each}
					</td>
					<td>
						{#each weapon.keepCloseKeepAway as value, i}
							<OptionalInput
								type="number"
								bind:value
								{editable}
								clipboardText={`Keep close/away: {1d100+${value}}`}
							/>
							{#if i < weapon.keepCloseKeepAway.length - 1} / {/if}
						{/each}
					</td>
					<td
						><OptionalInput
							type="number"
							bind:value={weapon.dmg}
							{editable}
							clipboardText={`Damage: {${weapon.dmg}d5!}`}
						/>d5!
						{#if editable}
							<DeleteButton
								on:click={() => {
									character.weapons.splice(weaponIdx, 1);
									character.weapons = character.weapons;
								}}
							/>
						{/if}
					</td>
				</tr>
			{/each}
			{#if editable}
				<tr>
					<th colspan="7" class="title">
						<IconButton
							title="label:new"
							on:click={() => {
								character.weapons = [
									...character.weapons,
									{
										name: '',
										ap: 0,
										dmg: 1,
										attack: [null, null, null],
										defend: [null, null, null],
										keepCloseKeepAway: [null, null],
										disengageCloseIn: [null, null]
									}
								];
							}}
						>
							<GiAnvil />
						</IconButton>
					</th>
				</tr>
			{/if}
		</tbody>
		<tbody>
			<tr>
				<th class="title separate-after" colspan="3">{$_('character:skills')}</th>
				<th class="title" colspan="4">{$_('character:spells')}</th>
			</tr>
			<tr>
				<th colspan="2">{$_('character:skill')}</th>
				<th class="separate-after">{$_('character:level')}</th>
				<th>{$_('label:spell')}</th>
				<th>{$_('action:ap')}</th>
				<th>{$_('label:spell_strength')}</th>
				<th>{$_('label:spell_count')}</th>
			</tr>
			{#each Array(tableMax) as _, i}
				{@const skill = character.extra_skills[i]}
				{@const spell = character.spells[i]}
				<tr class="striped">
					<td colspan="2">
						{#if skill}
							<LoreInfoIcon id={skill.name} />
							<OptionalInput
								type="select"
								bind:value={character.extra_skills[i].name}
								options={skillNames}
								{editable}
							/>
						{/if}
					</td>
					<td class="separate-after">
						{#if skill}
							<OptionalInput
								type="number"
								bind:value={character.extra_skills[i].level}
								clipboardText={`${character.extra_skills[i].name}: {${character.extra_skills[i].level}d10!}`}
								{editable}
							/>
							{#if editable}
								<DeleteButton
									on:click={() => {
										character.extra_skills.splice(i, 1);
										character.extra_skills = character.extra_skills;
									}}
								/>
							{/if}
						{/if}
					</td>
					<td>
						{#if spell}
							<LoreInfoIcon id={spell.name} />
							<OptionalInput
								type="select"
								bind:value={character.spells[i].name}
								options={spellNames}
								{editable}
							/>
						{/if}
					</td>
					<td>
						{#if spell}
							<OptionalInput type="number" bind:value={character.spells[i].ap} {editable} />
						{/if}
					</td>
					<td>
						{#if spell}
							<OptionalInput type="number" bind:value={character.spells[i].strength} {editable} />
						{/if}
					</td>
					<td>
						{#if spell}
							{#if !editable}
								<table class="circles">
									<Circles editable max={spell.maxCount} bind:value={character.spells[i].count} />
								</table>
							{:else}
								<OptionalInput type="number" bind:value={character.spells[i].maxCount} {editable} />
								<DeleteButton
									on:click={() => {
										character.spells.splice(i, 1);
										character.spells = character.spells;
									}}
								/>
							{/if}
						{/if}
					</td>
				</tr>
			{/each}
			{#if editable}
				<tr>
					<th colspan="3" class="title separate-after">
						<IconButton
							title="label:new"
							on:click={() => {
								character.extra_skills = [
									...character.extra_skills,
									{
										name: 'skill:alchemy',
										level: 0
									}
								];
							}}
						>
							<GiAnvil />
						</IconButton>
					</th>
					<th colspan="4" class="title">
						<IconButton
							title="label:new"
							on:click={() => {
								character.spells = [
									...character.spells,
									{
										name: 'spell:blunt_senses',
										ap: 0,
										strength: 0,
										count: 0,
										maxCount: 0
									}
								];
							}}
						>
							<GiAnvil />
						</IconButton>
					</th>
				</tr>
			{/if}
		</tbody>
		<tbody>
			<tr>
				<th colspan="7" class="title">{$_('label:notes')}</th>
			</tr>
			<tr>
				<td colspan="7" class="nopadding">
					<textarea rows="5" bind:value={character.notes} />
				</td>
			</tr>
		</tbody>
	</table>

	<style>
		div.titlebar {
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			width: 100%;
		}

		div.points > div {
			border-right: 1px solid black;
			padding-left: 0.2em;
			padding-right: 0.2em;
			text-align: center;
			font-weight: bold;
		}

		th.separate-after {
			border-right: 3px solid black !important;
		}

		.npc {
			width: 100%;
		}

		div.grow {
			flex-grow: 1;
		}

		div.points {
			display: flex;
			flex-flow: row;
		}

		textarea {
			width: 100%;
			box-sizing: border-box;
			resize: vertical;
		}

		table.npc {
			border-collapse: collapse;
			border-spacing: 0;
			border: 1px solid black;
		}

		table.npc > thead,
		table.npc > tbody {
			border-top: 3px solid black;
			border-bottom: 3px solid black;
		}

		table.circles {
			border: none;
		}

		table.npc > thead > tr > td,
		table.npc > tbody > tr > th {
			border: 1px solid black;
			box-sizing: border-box;
			padding-left: 0.3rem;
			text-align: left;
		}

		th.title {
			text-align: center !important;
		}

		table.npc > thead > tr > th,
		table.npc > tbody > tr > th {
			background-color: azure;
		}

		tr.striped:nth-of-type(even) {
			background-color: whitesmoke;
		}

		td.nopadding,
		th.nopadding {
			padding: 0;
			border: none;
		}
	</style>
</Box>
