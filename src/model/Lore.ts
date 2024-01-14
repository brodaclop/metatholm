import { entries } from "./InfoList";
import { Lore } from "./LoreList";

type OptionalString = string | null | undefined;

export const hasLore = (id: string, lang: OptionalString): boolean => id in Lore[lang ?? 'en'];
export const lore = async (id: string, lang: OptionalString): Promise<string> => (await Lore[lang ?? 'en'][id]).default;
export const loreCategoryList = async (category: string, lang: OptionalString): Promise<Array<{ id: string, title: string }>> => {
    const lorePromises: Array<[string, Promise<string>]> = entries(Lore[lang ?? 'en'])
        .filter(([key]) => key.split(':')[0] === category)
        .map(([key, value]) => ([key, value.then(v => v.default)]));
    const ret: Array<{ id: string, title: string }> = [];
    for (const entry of lorePromises) {
        ret.push({ id: entry[0], title: (await entry[1]).split('\n')[0] })
    }
    return ret;
}

