import { E } from "../logic/Expression";
import { kockaDobas, parseKocka } from "../logic/Kocka";
import { WEAPON_ATK, WEAPON_DEF, ATTACK_AP } from "./Rules";

export interface Weapon {
    ap: number;
    attack: number;
    defence: number;
}

export interface SimulationCharacter {
    skill: number;
    difficulty: 1 | 2 | 3;
    weapon: Weapon;
}

export type HitResult = 'miss' | 'hit' | 'critical';

const attack = (attacker: SimulationCharacter, defender: SimulationCharacter): HitResult => {
    const attackRoll = Math.round(E.evaluate(WEAPON_ATK, {
        'weapon:attack': attacker.weapon.attack,
        'weapon:skill': attacker.skill,
        'weapon:difficulty': attacker.difficulty
    }).result + kockaDobas(parseKocka('1d100')).osszeg);
    const defenceRoll = Math.round(E.evaluate(WEAPON_DEF, {
        'weapon:defence': defender.weapon.defence,
        'weapon:skill': defender.skill,
        'weapon:difficulty': defender.difficulty
    }).result + kockaDobas(parseKocka('1d100')).osszeg);
    if (attackRoll > defenceRoll + 50) {
        return 'critical';
    } else if (attackRoll > defenceRoll) {
        return 'hit';
    } else {
        return 'miss';
    }
}

export const simulateCombat = (playerOne: SimulationCharacter, playerTwo: SimulationCharacter, rounds: number): Record<HitResult, number> => {
    const ret: Record<HitResult, number> = {
        'critical': 0,
        'hit': 0,
        'miss': 0
    };
    for (let i = 0; i < rounds; i++) {
        let aps = kockaDobas(parseKocka('1d10+10')).osszeg;
        const apPerHit = E.evaluate(ATTACK_AP, {
            'weapon:ap': playerOne.weapon.ap,
            'weapon:skill': playerOne.skill,
            'weapon:difficulty': playerOne.difficulty
        }).result;
        while (aps >= Math.round(apPerHit / 2)) {
            const hit = attack(playerOne, playerTwo);
            ret[hit]++;
            aps -= apPerHit;
        }
    }
    return ret;
}