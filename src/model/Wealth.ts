import { keys } from "./InfoList";
import type { Language } from "./labels/Labels"

export type Wealth = 0 | 1 | 2 | 3 | 4;

type WealthStrings = {
    [wealth in Wealth as `wealth:${wealth}`]: string
}

export type WealthKeys = keyof WealthStrings;

export const WealthLabels: Record<Language, WealthStrings> = {
    en: {
        'wealth:0': 'Penniless',
        'wealth:1': 'Poor',
        'wealth:2': 'Modest',
        'wealth:3': 'Well-off',
        'wealth:4': 'Rich'
    },
    hu: {
        'wealth:0': 'Nincstelen',
        'wealth:1': 'Csóró',
        'wealth:2': 'Szerény',
        'wealth:3': 'Jómódú',
        'wealth:4': 'Gazdag'
    }
}

export const wealthKey = (wealth: Wealth): WealthKeys => `wealth:${wealth}`;

export const WEALTH_KEYS: Array<WealthKeys> = keys(WealthLabels.en);