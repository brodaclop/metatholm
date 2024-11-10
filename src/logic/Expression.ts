import type { Values } from "../model/labels/Labels";
import { kockaDobas, parseKocka, type KockaDobas } from "./Kocka";

export interface Value {
    type: 'value';
    name?: Values;
    roll?: KockaDobas | number;
}

export interface LevelSum {
    type: 'levelsum';
    name?: Values;
    arg: Expression;
}

export interface MultiOp {
    type: 'add' | 'mul' | 'max' | 'min';
    name?: Values;
    args: Array<Expression>;
}

export interface BinaryOp {
    type: 'div' | 'sub';
    name?: Values;
    args: [Expression, Expression];
}

export interface FloorOp {
    type: 'floor';
    name?: Values;
    arg: Expression;
}

export type Operation = MultiOp | BinaryOp | FloorOp;

export type Expression = Value | Operation | LevelSum | number;

export type EvalExpression = Expression & { result: number };

const calculateMultiOpResult = (type: MultiOp['type'], args: Array<EvalExpression>): number => {
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
        return 0;
    }
}

const evaluate = (expr: Expression, values: Partial<Record<Values, number | Array<number>>>, level?: number): EvalExpression => {
    if (typeof expr === 'number') {
        return { type: 'value', roll: expr, result: expr };
    }
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
    } else if (expr.type === 'sub') {
        const first = evaluate(expr.args[0], values, level);
        const second = evaluate(expr.args[1], values, level);
        return { type: 'sub', args: [first, second], result: first.result - second.result, name: expr.name };
    } else if (expr.type === 'floor') {
        const arg = evaluate(expr.arg, values, level);
        return { type: 'floor', arg, name: expr.name, result: Math.floor(arg.result) };
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

export const E = {
    evaluate: (expr: Expression, values: Partial<Record<Values, number | Array<number>>>): EvalExpression => {
        const ret = evaluate(expr, values);
        ret.result = Math.round(ret.result);
        return ret;
    },
    constant: (value: number | string | KockaDobas, name?: Values): Value => ({ type: 'value', name, roll: typeof value === 'object' || typeof value === 'number' ? value : parseKocka(String(value)) }),
    value: (name: Values, roll?: KockaDobas | string): Value => ({ type: 'value', name, roll: roll === undefined ? undefined : typeof roll === 'string' ? parseKocka(roll) : roll }),
    mul: (...args: Array<Expression>): MultiOp => ({ type: 'mul', args }),
    add: (...args: Array<Expression>): MultiOp => ({ type: 'add', args }),
    level: (arg: Expression): LevelSum => ({ type: 'levelsum', arg }),
    max: (...args: Array<Expression>): MultiOp => ({ type: 'max', args }),
    min: (...args: Array<Expression>): MultiOp => ({ type: 'min', args }),
    div: (denominator: Expression, divisor: Expression): BinaryOp => ({ type: 'div', args: [denominator, divisor] }),
    sub: (minuend: Expression, subtrahend: Expression): BinaryOp => ({ type: 'sub', args: [minuend, subtrahend] }),
    floor: (arg: Expression): FloorOp => ({ type: 'floor', arg }),
    name: (name: Values, expr: Exclude<Expression, number>): Expression => ({ ...expr, name })
};
