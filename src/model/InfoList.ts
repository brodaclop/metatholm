interface List<K extends string, V extends { name: K }> {
    has: (name: string | undefined) => name is K;
    get: (name: K) => V;
    list: () => Array<V>;
}

export const createList = <K extends string, V extends { name: K }>(input: Record<K, Omit<V, 'name'>>): List<K, V> => {
    return {
        has: (name: string | undefined): name is K => !!(name && input[name as K]),
        get: (name: K) => ({ name, ...input[name] }) as unknown as V,
        list: () => Object.entries(input).map(([name, value]) => ({ name, ...value as Omit<K, 'name'> })) as unknown as Array<V>,
    }
}

export const keys = <K extends string, V>(rec: Partial<Record<K, V>>): Array<K> => rec === null || rec === undefined ? [] : Object.keys(rec) as Array<K>;
export const entries = <K extends string, V>(rec: Partial<Record<K, V>>): Array<[K, V]> => rec === null || rec === undefined ? [] : Object.entries(rec) as Array<[K, V]>;

export const group = <K extends string, V>(input: Array<V>, groupFn: (ob: V) => K): Record<K, Array<V>> => input.reduce((acc, curr) => {
    const key = groupFn(curr);
    acc[key] = [...(acc[key] ?? []), curr];
    return acc;
}, {} as Record<K, Array<V>>);

export const sort = <K>(input: Array<K>, field: keyof K, translator: (label: string) => string) => input.toSorted((a, z) =>
    translator(String(a[field])).localeCompare(translator(String(z[field]))));