export type VariableType = 'state' | 'action';

export interface Variable {
    type: VariableType;
    id: string;
    value: string;
}

export interface Rule {
    input: { state: Variable, actions: Variable[] },
    output: { state?: Variable, actions: Variable[] },
}

export default class Parser {
    context: Variable[];
    rules: Rule[];

    constructor() {
        this.context = [];
        this.rules = [];
    }

    getOrCreate(name: string): Variable {
        let found = void 0;
        this.context.forEach(e => {
           if (e.id === name) found = e;
        });
        if (found) return found;
        const res = { id: name, value: name, type: Parser.isState(name) } as Variable;
        this.context.push(res);
        return res;
    }

    static isState(name: string): VariableType {
        return name[0].toLowerCase() === name[0]  ? 'action' : 'state';
    }

    public static parse(input: string): Parser {
        const parser = new Parser();
        const strs = input.trim().split(';');
        strs.forEach(str => {
            const regDeclaration = /^#\s*(\w+)\s*=\s*(\w+)/;
            if (regDeclaration.test(str)) {
                const [,name, value] = regDeclaration.exec(str);
                parser.context.push({ id: name, value, type: Parser.isState(name) });
            }
            const regRule = /^\s*(\w+)(.+)->\s*(\w+)(.*)/;
            if (regRule.test(str)) {
                const [, stateIn, actionsIn, stateOut, actionsOut] = regRule.exec(str);
                const rule = {} as Rule;
                const varStateIn = parser.getOrCreate(stateIn);
                const actions = actionsIn.trim().split(' ').map(a => parser.getOrCreate(a));
                rule.input = { state: varStateIn, actions };
                const varOut = parser.getOrCreate(stateOut);
                if (actionsOut) {
                    rule.output = {
                        state: varOut,
                        actions: actionsOut.trim().split(' ').map(a => parser.getOrCreate(a))
                    };
                } else {
                    rule.output = {
                        actions: [varOut],
                    };
                }
                parser.rules.push(rule);
            }
        });
        return parser;
    }
}
