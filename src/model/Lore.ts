import { entries } from "./InfoList";

const convertToLoreId = (file: string): [string, string, number] => {
    const ret = file.replace('/src/lib/lore/', '').replace('.md', '').replaceAll('/', ':');
    const lang = ret.slice(-2);
    const [id, index] = ret.slice(0, -3).split('!')

    return [lang, id, Number(index ?? '0')];
}

const LORES = import.meta.glob('$lib/lore/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

const Lore: Record<string, Record<string, { index: number, text: string }>> = { en: {}, hu: {} };

entries(LORES).forEach(([key, value]) => {
    const [lang, id, index] = convertToLoreId(key);
    try {
        Lore[lang][id] = { index, text: value as string };
    } catch (e) {
        console.error('Failed to load', key, id, lang);
    }
});


type OptionalString = string | null | undefined;

export const hasLore = (id: string, lang: OptionalString): boolean => id in Lore[lang ?? 'en'];
export const lore = (id: string, lang: OptionalString): string => Lore[lang ?? 'en'][id].text;

export const loreIncomingLinks = (id: string, lang: OptionalString): Array<{ id: string, title: string }> => {
    const linkString = `(${id})`;
    return entries(Lore[lang ?? 'en'])
        .filter(([, value]) => value.text.includes(linkString))
        .map(([id, file]) => ({ id, title: file.text.split('\n', 1)[0].replace(/#/g, '') }));
}

export const loreCategoryList = (category: string, lang: OptionalString, bookMode: boolean): Array<{ id: string, title: string }> => {
    const filterList = category.split(':');
    let wildcards = 0;
    while (filterList.at(-1) === '*') {
        filterList.pop();
        wildcards++;
    }
    const filterListLength = filterList.length;
    const filterString = filterList.join(':');

    const inCategory = (key: string) => {
        const keyList = key.split(':');
        return (keyList.length === filterList.length + wildcards + 1 && keyList.slice(0, filterListLength).join(':') === filterString);
    }

    return entries(Lore[lang ?? 'en'])
        .filter(([key]) => inCategory(key))
        .map(([id, file]) => ({ id: id, index: file.index, title: file.text.split('\n', 1)[0].replace(/#/g, '') }))
        .sort((a, z) => bookMode ? a.id.localeCompare(z.id) : a.title.localeCompare(z.title))
        .sort((a, z) => a.index - z.index);
}

