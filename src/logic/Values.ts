import type { Ability } from "../model/Abilities";
import type { ExpressionNames } from "../model/Rules";
import type { Skill } from "../model/Skills";

export type Values =
    | Ability
    | Skill
    | ExpressionNames
    | 'action:title'
    | 'skill_type:general'
    | 'character:level'
    | 'weapon:speed'
    | 'weapon:skill'
    | 'weapon:difficulty'
    | 'weapon:reach'
    | 'weapon:attack'
    | 'weapon:defence'
    | 'weapon:effective_skill'
    | 'character:ip'
    ;
