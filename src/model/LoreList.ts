export const Lore: Record<string, Record<string, Promise<typeof import("*?raw")>>> = {
	hu: {
		'main': import('$lib/lore/main_hu.md?raw'),
		'ability:activity': import('$lib/lore/ability/activity_hu.md?raw'),
		'ability:build': import('$lib/lore/ability/build_hu.md?raw'),
		'ability:magic': import('$lib/lore/ability/magic_hu.md?raw'),
		'ability:presence': import('$lib/lore/ability/presence_hu.md?raw'),
		'action:attack': import('$lib/lore/action/attack_hu.md?raw'),
		'action:attack-cq': import('$lib/lore/action/attack-cq_hu.md?raw'),
		'action:attack-range': import('$lib/lore/action/attack-range_hu.md?raw'),
		'action:close-in': import('$lib/lore/action/close-in_hu.md?raw'),
		'action:defend': import('$lib/lore/action/defend_hu.md?raw'),
		'action:defend-cq': import('$lib/lore/action/defend-cq_hu.md?raw'),
		'action:defend-range': import('$lib/lore/action/defend-range_hu.md?raw'),
		'action:disengage': import('$lib/lore/action/disengage_hu.md?raw'),
		'action:do-nothing': import('$lib/lore/action/do-nothing_hu.md?raw'),
		'action:keep-away': import('$lib/lore/action/keep-away_hu.md?raw'),
		'action:keep-close': import('$lib/lore/action/keep-close_hu.md?raw'),
		'action:step-in': import('$lib/lore/action/step-in_hu.md?raw'),
		'action:step-out': import('$lib/lore/action/step-out_hu.md?raw'),
		'ancestry:almarem': import('$lib/lore/ancestry/almarem_hu.md?raw'),
		'ancestry:dwarvish': import('$lib/lore/ancestry/dwarvish_hu.md?raw'),
		'ancestry:elven': import('$lib/lore/ancestry/elven_hu.md?raw'),
		'ancestry:gnomish': import('$lib/lore/ancestry/gnomish_hu.md?raw'),
		'ancestry:godora': import('$lib/lore/ancestry/godora_hu.md?raw'),
		'ancestry:ilar': import('$lib/lore/ancestry/ilar_hu.md?raw'),
		'ancestry:kalovin': import('$lib/lore/ancestry/kalovin_hu.md?raw'),
		'ancestry:orcish': import('$lib/lore/ancestry/orcish_hu.md?raw'),
		'background:assassin': import('$lib/lore/background/assassin_hu.md?raw'),
		'background:bruiser': import('$lib/lore/background/bruiser_hu.md?raw'),
		'background:charmer': import('$lib/lore/background/charmer_hu.md?raw'),
		'background:hedge_wizard': import('$lib/lore/background/hedge_wizard_hu.md?raw'),
		'background:sneak': import('$lib/lore/background/sneak_hu.md?raw'),
		'background:tinker': import('$lib/lore/background/tinker_hu.md?raw'),
		'background:vagabond': import('$lib/lore/background/vagabond_hu.md?raw'),
		'background:witch': import('$lib/lore/background/witch_hu.md?raw'),
		'character:abilities': import('$lib/lore/character/abilities_hu.md?raw'),
		'character:ancestry': import('$lib/lore/character/ancestry_hu.md?raw'),
		'character:background': import('$lib/lore/character/background_hu.md?raw'),
		'character:dr': import('$lib/lore/character/dr_hu.md?raw'),
		'character:ep': import('$lib/lore/character/ep_hu.md?raw'),
		'character:fp': import('$lib/lore/character/fp_hu.md?raw'),
		'character:kp': import('$lib/lore/character/kp_hu.md?raw'),
		'character:level': import('$lib/lore/character/level_hu.md?raw'),
		'character:mp': import('$lib/lore/character/mp_hu.md?raw'),
		'character:skills': import('$lib/lore/character/skills_hu.md?raw'),
		'rule:combat': import('$lib/lore/rule/combat_hu.md?raw'),
		'rule:exploding_dice': import('$lib/lore/rule/exploding_dice_hu.md?raw'),
		'rule:learning_skills': import('$lib/lore/rule/learning_skills_hu.md?raw'),
		'rule:magic': import('$lib/lore/rule/magic_hu.md?raw'),
		'rule:skill_check': import('$lib/lore/rule/skill_check_hu.md?raw'),
		'skill:alchemy': import('$lib/lore/skill/alchemy_hu.md?raw'),
		'skill:architecture': import('$lib/lore/skill/architecture_hu.md?raw'),
		'skill:balance': import('$lib/lore/skill/balance_hu.md?raw'),
		'skill:bamboozling': import('$lib/lore/skill/bamboozling_hu.md?raw'),
		'skill:body_focus': import('$lib/lore/skill/body_focus_hu.md?raw'),
		'skill:bows': import('$lib/lore/skill/bows_hu.md?raw'),
		'skill:brawling': import('$lib/lore/skill/brawling_hu.md?raw'),
		'skill:bushcraft': import('$lib/lore/skill/bushcraft_hu.md?raw'),
		'skill:camouflage': import('$lib/lore/skill/camouflage_hu.md?raw'),
		'skill:climbing': import('$lib/lore/skill/climbing_hu.md?raw'),
		'skill:crossbows': import('$lib/lore/skill/crossbows_hu.md?raw'),
		'skill:elemental_focus': import('$lib/lore/skill/elemental_focus_hu.md?raw'),
		'skill:enchantment': import('$lib/lore/skill/enchantment_hu.md?raw'),
		'skill:endurance': import('$lib/lore/skill/endurance_hu.md?raw'),
		'skill:etiquette': import('$lib/lore/skill/etiquette_hu.md?raw'),
		'skill:fistfighting': import('$lib/lore/skill/fistfighting_hu.md?raw'),
		'skill:geography': import('$lib/lore/skill/geography_hu.md?raw'),
		'skill:hiding': import('$lib/lore/skill/hiding_hu.md?raw'),
		'skill:history': import('$lib/lore/skill/history_hu.md?raw'),
		'skill:jumping': import('$lib/lore/skill/jumping_hu.md?raw'),
		'skill:knives': import('$lib/lore/skill/knives_hu.md?raw'),
		'skill:law': import('$lib/lore/skill/law_hu.md?raw'),
		'skill:life_focus': import('$lib/lore/skill/life_focus_hu.md?raw'),
		'skill:maces': import('$lib/lore/skill/maces_hu.md?raw'),
		'skill:magic_force': import('$lib/lore/skill/magic_force_hu.md?raw'),
		'skill:martial_arts': import('$lib/lore/skill/martial_arts_hu.md?raw'),
		'skill:medicine': import('$lib/lore/skill/medicine_hu.md?raw'),
		'skill:nature_focus': import('$lib/lore/skill/nature_focus_hu.md?raw'),
		'skill:pain_threshold': import('$lib/lore/skill/pain_threshold_hu.md?raw'),
		'skill:personal_charm': import('$lib/lore/skill/personal_charm_hu.md?raw'),
		'skill:polearms': import('$lib/lore/skill/polearms_hu.md?raw'),
		'skill:reactions': import('$lib/lore/skill/reactions_hu.md?raw'),
		'skill:reasoning': import('$lib/lore/skill/reasoning_hu.md?raw'),
		'skill:shadow_focus': import('$lib/lore/skill/shadow_focus_hu.md?raw'),
		'skill:spacetime_focus': import('$lib/lore/skill/spacetime_focus_hu.md?raw'),
		'skill:spirit_focus': import('$lib/lore/skill/spirit_focus_hu.md?raw'),
		'skill:spot_hidden': import('$lib/lore/skill/spot_hidden_hu.md?raw'),
		'skill:sprinting': import('$lib/lore/skill/sprinting_hu.md?raw'),
		'skill:stalking': import('$lib/lore/skill/stalking_hu.md?raw'),
		'skill:strength': import('$lib/lore/skill/strength_hu.md?raw'),
		'skill:swimming': import('$lib/lore/skill/swimming_hu.md?raw'),
		'skill:swords': import('$lib/lore/skill/swords_hu.md?raw'),
		'skill:throwing': import('$lib/lore/skill/throwing_hu.md?raw'),
		'spell:blunt_senses': import('$lib/lore/spell/blunt_senses_hu.md?raw'),
		'spell:borrow_time': import('$lib/lore/spell/borrow_time_hu.md?raw'),
		'spell:call_animals': import('$lib/lore/spell/call_animals_hu.md?raw'),
		'spell:cleaning': import('$lib/lore/spell/cleaning_hu.md?raw'),
		'spell:cloak_of_shadow': import('$lib/lore/spell/cloak_of_shadow_hu.md?raw'),
		'spell:commune_with_spirits': import('$lib/lore/spell/commune_with_spirits_hu.md?raw'),
		'spell:convert_life_to_magic': import('$lib/lore/spell/convert_life_to_magic_hu.md?raw'),
		'spell:darken': import('$lib/lore/spell/darken_hu.md?raw'),
		'spell:drain_magic': import('$lib/lore/spell/drain_magic_hu.md?raw'),
		'spell:extinguish_fire': import('$lib/lore/spell/extinguish_fire_hu.md?raw'),
		'spell:extinguish_magic': import('$lib/lore/spell/extinguish_magic_hu.md?raw'),
		'spell:farsight': import('$lib/lore/spell/farsight_hu.md?raw'),
		'spell:fire_arrow': import('$lib/lore/spell/fire_arrow_hu.md?raw'),
		'spell:flameball': import('$lib/lore/spell/flameball_hu.md?raw'),
		'spell:fool_senses': import('$lib/lore/spell/fool_senses_hu.md?raw'),
		'spell:hardened_skin': import('$lib/lore/spell/hardened_skin_hu.md?raw'),
		'spell:heal': import('$lib/lore/spell/heal_hu.md?raw'),
		'spell:heat_material': import('$lib/lore/spell/heat_material_hu.md?raw'),
		'spell:iron_fist': import('$lib/lore/spell/iron_fist_hu.md?raw'),
		'spell:jump': import('$lib/lore/spell/jump_hu.md?raw'),
		'spell:lantern': import('$lib/lore/spell/lantern_hu.md?raw'),
		'spell:lend_life': import('$lib/lore/spell/lend_life_hu.md?raw'),
		'spell:light_fire': import('$lib/lore/spell/light_fire_hu.md?raw'),
		'spell:lightning_strike': import('$lib/lore/spell/lightning_strike_hu.md?raw'),
		'spell:magic_bolt': import('$lib/lore/spell/magic_bolt_hu.md?raw'),
		'spell:maintain_body_temperature': import('$lib/lore/spell/maintain_body_temperature_hu.md?raw'),
		'spell:message': import('$lib/lore/spell/message_hu.md?raw'),
		'spell:read_emotions': import('$lib/lore/spell/read_emotions_hu.md?raw'),
		'spell:sense_life': import('$lib/lore/spell/sense_life_hu.md?raw'),
		'spell:sense_poison': import('$lib/lore/spell/sense_poison_hu.md?raw'),
		'spell:shadow_leap': import('$lib/lore/spell/shadow_leap_hu.md?raw'),
		'spell:shelter': import('$lib/lore/spell/shelter_hu.md?raw'),
		'spell:shout': import('$lib/lore/spell/shout_hu.md?raw'),
		'spell:spirit_shroud': import('$lib/lore/spell/spirit_shroud_hu.md?raw'),
		'spell:steel_will': import('$lib/lore/spell/steel_will_hu.md?raw'),
		'spell:suppress_pain': import('$lib/lore/spell/suppress_pain_hu.md?raw'),
		'spell:sustenance': import('$lib/lore/spell/sustenance_hu.md?raw'),
		'spell:telekinesis': import('$lib/lore/spell/telekinesis_hu.md?raw'),
		'spell:thicket': import('$lib/lore/spell/thicket_hu.md?raw'),
		'spell:wall_of_flame': import('$lib/lore/spell/wall_of_flame_hu.md?raw'),
		'spell:whispering_shadows': import('$lib/lore/spell/whispering_shadows_hu.md?raw'),
		'spell:write_memories': import('$lib/lore/spell/write_memories_hu.md?raw'),
		'world:realms:dragon_straits:realm': import('$lib/lore/world/realms/dragon_straits/realm_hu.md?raw'),
		'world:realms:dragon_straits:settlements:fort_gullet': import('$lib/lore/world/realms/dragon_straits/settlements/fort_gullet_hu.md?raw'),
		'world:realms:dragon_straits:settlements:north_jaw': import('$lib/lore/world/realms/dragon_straits/settlements/north_jaw_hu.md?raw'),
		'world:realms:dragon_straits:settlements:ravenbluff': import('$lib/lore/world/realms/dragon_straits/settlements/ravenbluff_hu.md?raw'),
		'world:realms:dragon_straits:settlements:south_jaw': import('$lib/lore/world/realms/dragon_straits/settlements/south_jaw_hu.md?raw'),
	},
	en: {
		'main': import('$lib/lore/main_en.md?raw'),
		'ability:activity': import('$lib/lore/ability/activity_en.md?raw'),
		'ability:build': import('$lib/lore/ability/build_en.md?raw'),
		'ability:magic': import('$lib/lore/ability/magic_en.md?raw'),
		'ability:presence': import('$lib/lore/ability/presence_en.md?raw'),
		'action:attack': import('$lib/lore/action/attack_en.md?raw'),
		'action:attack-cq': import('$lib/lore/action/attack-cq_en.md?raw'),
		'action:attack-range': import('$lib/lore/action/attack-range_en.md?raw'),
		'action:close-in': import('$lib/lore/action/close-in_en.md?raw'),
		'action:defend': import('$lib/lore/action/defend_en.md?raw'),
		'action:defend-cq': import('$lib/lore/action/defend-cq_en.md?raw'),
		'action:defend-range': import('$lib/lore/action/defend-range_en.md?raw'),
		'action:disengage': import('$lib/lore/action/disengage_en.md?raw'),
		'action:do-nothing': import('$lib/lore/action/do-nothing_en.md?raw'),
		'action:keep-away': import('$lib/lore/action/keep-away_en.md?raw'),
		'action:keep-close': import('$lib/lore/action/keep-close_en.md?raw'),
		'action:step-in': import('$lib/lore/action/step-in_en.md?raw'),
		'action:step-out': import('$lib/lore/action/step-out_en.md?raw'),
		'ancestry:almarem': import('$lib/lore/ancestry/almarem_en.md?raw'),
		'ancestry:dwarvish': import('$lib/lore/ancestry/dwarvish_en.md?raw'),
		'ancestry:elven': import('$lib/lore/ancestry/elven_en.md?raw'),
		'ancestry:gnomish': import('$lib/lore/ancestry/gnomish_en.md?raw'),
		'ancestry:godora': import('$lib/lore/ancestry/godora_en.md?raw'),
		'ancestry:ilar': import('$lib/lore/ancestry/ilar_en.md?raw'),
		'ancestry:kalovin': import('$lib/lore/ancestry/kalovin_en.md?raw'),
		'ancestry:orcish': import('$lib/lore/ancestry/orcish_en.md?raw'),
		'background:assassin': import('$lib/lore/background/assassin_en.md?raw'),
		'background:bruiser': import('$lib/lore/background/bruiser_en.md?raw'),
		'background:charmer': import('$lib/lore/background/charmer_en.md?raw'),
		'background:hedge_wizard': import('$lib/lore/background/hedge_wizard_en.md?raw'),
		'background:sneak': import('$lib/lore/background/sneak_en.md?raw'),
		'background:tinker': import('$lib/lore/background/tinker_en.md?raw'),
		'background:vagabond': import('$lib/lore/background/vagabond_en.md?raw'),
		'background:witch': import('$lib/lore/background/witch_en.md?raw'),
		'character:abilities': import('$lib/lore/character/abilities_en.md?raw'),
		'character:ancestry': import('$lib/lore/character/ancestry_en.md?raw'),
		'character:background': import('$lib/lore/character/background_en.md?raw'),
		'character:dr': import('$lib/lore/character/dr_en.md?raw'),
		'character:ep': import('$lib/lore/character/ep_en.md?raw'),
		'character:fp': import('$lib/lore/character/fp_en.md?raw'),
		'character:kp': import('$lib/lore/character/kp_en.md?raw'),
		'character:level': import('$lib/lore/character/level_en.md?raw'),
		'character:skills': import('$lib/lore/character/skills_en.md?raw'),
		'rule:combat': import('$lib/lore/rule/combat_en.md?raw'),
		'rule:exploding_dice': import('$lib/lore/rule/exploding_dice_en.md?raw'),
		'rule:learning_skills': import('$lib/lore/rule/learning_skills_en.md?raw'),
		'rule:skill_check': import('$lib/lore/rule/skill_check_en.md?raw'),
		'skill:alchemy': import('$lib/lore/skill/alchemy_en.md?raw'),
		'skill:architecture': import('$lib/lore/skill/architecture_en.md?raw'),
		'skill:balance': import('$lib/lore/skill/balance_en.md?raw'),
		'skill:bamboozling': import('$lib/lore/skill/bamboozling_en.md?raw'),
		'skill:body_focus': import('$lib/lore/skill/body_focus_en.md?raw'),
		'skill:bows': import('$lib/lore/skill/bows_en.md?raw'),
		'skill:brawling': import('$lib/lore/skill/brawling_en.md?raw'),
		'skill:bushcraft': import('$lib/lore/skill/bushcraft_en.md?raw'),
		'skill:camouflage': import('$lib/lore/skill/camouflage_en.md?raw'),
		'skill:climbing': import('$lib/lore/skill/climbing_en.md?raw'),
		'skill:crossbows': import('$lib/lore/skill/crossbows_en.md?raw'),
		'skill:elemental_focus': import('$lib/lore/skill/elemental_focus_en.md?raw'),
		'skill:enchantment': import('$lib/lore/skill/enchantment_en.md?raw'),
		'skill:endurance': import('$lib/lore/skill/endurance_en.md?raw'),
		'skill:etiquette': import('$lib/lore/skill/etiquette_en.md?raw'),
		'skill:fistfighting': import('$lib/lore/skill/fistfighting_en.md?raw'),
		'skill:geography': import('$lib/lore/skill/geography_en.md?raw'),
		'skill:hiding': import('$lib/lore/skill/hiding_en.md?raw'),
		'skill:history': import('$lib/lore/skill/history_en.md?raw'),
		'skill:jumping': import('$lib/lore/skill/jumping_en.md?raw'),
		'skill:knives': import('$lib/lore/skill/knives_en.md?raw'),
		'skill:law': import('$lib/lore/skill/law_en.md?raw'),
		'skill:life_focus': import('$lib/lore/skill/life_focus_en.md?raw'),
		'skill:maces': import('$lib/lore/skill/maces_en.md?raw'),
		'skill:magic_force': import('$lib/lore/skill/magic_force_en.md?raw'),
		'skill:martial_arts': import('$lib/lore/skill/martial_arts_en.md?raw'),
		'skill:medicine': import('$lib/lore/skill/medicine_en.md?raw'),
		'skill:nature_focus': import('$lib/lore/skill/nature_focus_en.md?raw'),
		'skill:pain_threshold': import('$lib/lore/skill/pain_threshold_en.md?raw'),
		'skill:personal_charm': import('$lib/lore/skill/personal_charm_en.md?raw'),
		'skill:polearms': import('$lib/lore/skill/polearms_en.md?raw'),
		'skill:reactions': import('$lib/lore/skill/reactions_en.md?raw'),
		'skill:reasoning': import('$lib/lore/skill/reasoning_en.md?raw'),
		'skill:shadow_focus': import('$lib/lore/skill/shadow_focus_en.md?raw'),
		'skill:spacetime_focus': import('$lib/lore/skill/spacetime_focus_en.md?raw'),
		'skill:spirit_focus': import('$lib/lore/skill/spirit_focus_en.md?raw'),
		'skill:spot_hidden': import('$lib/lore/skill/spot_hidden_en.md?raw'),
		'skill:sprinting': import('$lib/lore/skill/sprinting_en.md?raw'),
		'skill:stalking': import('$lib/lore/skill/stalking_en.md?raw'),
		'skill:strength': import('$lib/lore/skill/strength_en.md?raw'),
		'skill:swimming': import('$lib/lore/skill/swimming_en.md?raw'),
		'skill:swords': import('$lib/lore/skill/swords_en.md?raw'),
		'skill:throwing': import('$lib/lore/skill/throwing_en.md?raw'),
	}
};