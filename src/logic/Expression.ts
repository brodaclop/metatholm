import type { Labels } from "../model/Labels";
import { kockaDobas, parseKocka, type KockaDobas } from "./Kocka";

export interface Value {
    type: 'value';
    name?: typeof Labels.keys[number];
    roll?: KockaDobas | number;
}

export interface LevelSum {
    type: 'levelsum';
    name?: typeof Labels.keys[number];
    arg: Expression;
}

export interface MultiOp {
    type: 'add' | 'mul' | 'max' | 'min';
    name?: typeof Labels.keys[number];
    args: Array<Expression>;
}

export interface BinaryOp {
    type: 'div';
    name?: typeof Labels.keys[number];
    args: [Expression, Expression];
}

export type Operation = MultiOp | BinaryOp;

export type Expression = Value | Operation | LevelSum;

export type EvalExpression = Expression & { result: number };

const calculateMultiOpResult = (type: MultiOp['type'], args: Array<EvalExpression>): number => {
    console.log('type', type);
    switch (type) {
        case 'max': return Math.max(...args.map(a => a.result));
        case 'min': return Math.min(...args.map(a => a.result));
        case 'add': return args.reduce((acc, curr) => acc + curr.result, 0);
        case 'mul': return args.reduce((acc, curr) => acc * curr.result, 1);
    }
}

const evaluateValue = (values?: number | Array<number>, roll?: KockaDobas | number, level?: number): number => {
    if (typeof values === 'number') {
        return values;
    }
    if (Array.isArray(values)) {
        if (level === undefined) {
            throw new Error(`value array provided without level`);
        }
        return values[level];
    } else if (roll !== undefined) {
        return typeof roll === 'object' ? kockaDobas(roll).osszeg : roll;
    } else {
        throw new Error('missing value');
    }
}

const evaluate = (expr: Expression, values: Partial<Record<typeof Labels.keys[number], number | Array<number>>>, level?: number): EvalExpression => {
    if (expr.type === 'value') {
        const result = evaluateValue(expr.name ? values[expr.name] : undefined, expr.roll, level);
        return { ...expr, result };
    } else if (expr.type === 'levelsum') {
        const levels = values['character:level'];
        const args = Array(levels).fill(undefined).map((_, i) => {
            return evaluate(expr.arg, values, i)
        });
        const result = calculateMultiOpResult('add', args);
        return { type: 'add', args, result, name: expr.name };
    } else if (expr.type === 'div') {
        const nom = evaluate(expr.args[0], values, level);
        const div = evaluate(expr.args[1], values, level);
        return { type: 'div', args: [nom, div], result: nom.result / div.result, name: expr.name };
    } else {
        const args = expr.args.map(arg => evaluate(arg, values, level));
        const result = calculateMultiOpResult(expr.type, args);
        return {
            type: expr.type,
            name: expr.name,
            args,
            result
        };
    }
}

export const Expression = {
    evaluate,
    constant: (value: number | string | KockaDobas, name?: typeof Labels.keys[number]): Value => ({ type: 'value', name, roll: typeof value === 'object' || typeof value === 'number' ? value : parseKocka(String(value)) }),
    value: (name: typeof Labels.keys[number], roll?: KockaDobas | string): Value => ({ type: 'value', name, roll: roll === undefined ? undefined : typeof roll === 'string' ? parseKocka(roll) : roll }),
    mul: (...args: Array<Expression>): MultiOp => ({ type: 'mul', args }),
    add: (...args: Array<Expression>): MultiOp => ({ type: 'add', args }),
    level: (arg: Expression): LevelSum => ({ type: 'levelsum', arg }),
    max: (...args: Array<Expression>): MultiOp => ({ type: 'max', args }),
    min: (...args: Array<Expression>): MultiOp => ({ type: 'min', args }),
    div: (denominator: Expression, divisor: Expression) => ({ type: 'div', args: [denominator, divisor] }),
    name: (name: typeof Labels.keys[number], expr: Expression): Expression => ({ ...expr, name })
};
