import fs from 'node:fs';

const LORE_DIR = './src/lib/lore';
const LORELIST_FILE = './src/model/LoreList.ts'

const scanDir = (prefix = '') => fs.readdirSync(`${LORE_DIR}${prefix ? '/' : ''}${prefix}`).flatMap(f => {
    if (f.endsWith('.md')) {
        return [{ name: f, category: prefix }];
    } else {
        return scanDir(`${prefix}${prefix ? '/' : ''}${f}`);
    }
});

const all = scanDir();

const langs = { hu: [], en: [] };

all.forEach(f => {
    const suffixStart = f.name.lastIndexOf('_');
    const lang = f.name.substring(suffixStart + 1, f.name.indexOf('.md'));
    langs[lang].push(f);
});

const langDefs = Object.fromEntries(Object.entries(langs).map(([lang, files]) => {
    files.sort((a, z) => {
        let ret = a.category.localeCompare(z.category);
        if (ret === 0) {
            ret = a.name.localeCompare(z.name);
        }
        return ret;
    });
    return [lang, files.map(f => `\t\t'${f.category.replaceAll('/', ':')}${f.category ? ':' : ''}${f.name.substring(0, f.name.lastIndexOf('_'))}': import('$lib/lore/${f.category}${f.category ? '/' : ''}${f.name}?raw'),`).join('\n')];
}));

const output = 'export const Lore: Record<string, Record<string, Promise<typeof import("*?raw")>>> = {' +
    Object.entries(langDefs).map(([lang, files]) => `\n\t${lang}: {\n${files}\n\t}`)
    +
    '\n};'

fs.writeFileSync(LORELIST_FILE, output, { encoding: 'utf-8' });
