const Abilities = ['height', 'stature', 'presence', 'magic'] as const;

export interface Karakter {
    abilities: Record<typeof Abilities[number], number>;

}