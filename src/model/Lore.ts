import { entries } from "./InfoList";

//TODO: basic description of world

const convertToLoreId = (file: string): [string, string] => {
    const ret = file.replace('/src/lib/lore/', '').replace('.md', '').replaceAll('/', ':');
    return [ret.slice(-2), ret.slice(0, -3)];
}

const LORES = import.meta.glob('$lib/lore/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

const Lore: Record<string, Record<string, string>> = { en: {}, hu: {} };

entries(LORES).forEach(([key, value]) => {
    const [lang, id] = convertToLoreId(key);
    try {
        Lore[lang][id] = value as string;
    } catch (e) {
        console.log(key, id, lang);
    }
});


type OptionalString = string | null | undefined;

export const hasLore = (id: string, lang: OptionalString): boolean => id in Lore[lang ?? 'en'];
export const lore = (id: string, lang: OptionalString): string => Lore[lang ?? 'en'][id];
export const loreCategoryList = (category: string, lang: OptionalString): Array<{ id: string, title: string }> => {
    //TODO: optimise this, it's absolute crap
    const categoryList = category.split(':');
    let wildcards = 0;
    while (categoryList.at(-1) === '*') {
        categoryList.pop();
        wildcards++;
    }
    const inCategory = (key: string) => {
        const keyList = key.split(':');
        return (keyList.length === categoryList.length + wildcards + 1 && keyList.slice(0, categoryList.length).join(':') === categoryList.join(':'));
    }

    const lorePromises: Array<[string, string]> = entries(Lore[lang ?? 'en'])
        .filter(([key]) => inCategory(key));
    const ret: Array<{ id: string, title: string }> = [];
    for (const entry of lorePromises) {
        ret.push({ id: entry[0], title: entry[1].split('\n')[0] })
    }
    return ret;
}

