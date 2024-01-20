import { entries } from "./InfoList";
import { Lore } from "./LoreList";

type OptionalString = string | null | undefined;

export const hasLore = (id: string, lang: OptionalString): boolean => id in Lore[lang ?? 'en'];
export const lore = async (id: string, lang: OptionalString): Promise<string> => (await Lore[lang ?? 'en'][id]).default;
export const loreCategoryList = async (category: string, lang: OptionalString): Promise<Array<{ id: string, title: string }>> => {
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

    const lorePromises: Array<[string, Promise<string>]> = entries(Lore[lang ?? 'en'])
        .filter(([key]) => inCategory(key))
        .map(([key, value]) => ([key, value.then(v => v.default)]));
    const ret: Array<{ id: string, title: string }> = [];
    for (const entry of lorePromises) {
        ret.push({ id: entry[0], title: (await entry[1]).split('\n')[0] })
    }
    return ret;
}

