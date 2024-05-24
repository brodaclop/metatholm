import { entries, sort } from "../InfoList";
import { Skill, type Personality } from "../Skills";

export const calculatePersonality = (skills: Partial<Record<Skill, number>>): Array<Personality> => {
    const traits: Partial<Record<Personality, number>> = entries(skills).reduce((acc, [skill, level]) => {
        const info = Skill.get(skill);
        info.personality?.forEach(p => acc[p] = (acc[p] ?? 0) + level);
        return acc;
    }, {} as Partial<Record<Personality, number>>);

    console.log('raw traits', JSON.parse(JSON.stringify(traits)));

    const frequency: Partial<Record<Personality, number>> = Skill.list().reduce((acc, info) => {
        info.personality?.forEach(p => acc[p] = (acc[p] ?? 0) + 1);
        return acc;
    }, {} as Partial<Record<Personality, number>>);

    console.log('frequency', JSON.parse(JSON.stringify(frequency)));

    entries(frequency).forEach(([trait, total]) => {
        traits[trait] = (traits[trait] ?? 0) / total;
    });

    console.log('normalised traits', JSON.parse(JSON.stringify(traits)));

    const topTraits = entries(traits).sort((a, z) => z[1] - a[1]).slice(0, 3);

    return topTraits.map(t => t[0]);
}