export type StateType = 'initial' | 'ordinary';

export interface State {
    type: StateType;
    id: string;
    value: string;
}

export interface Rule {
    input: { state: State, event: Action },
    output: { state?: State, action: Action },
}

export interface Action {
    id: string;
    type?: string;
    value: any;
}

export default class Parser {
    states: State[];
    actions: Action[];
    rules: Rule[];

    constructor() {
        this.states = [];
        this.actions = [];
        this.rules = [];
    }

    getOrCreate(name: string, type: 'state'|'action'): State|Action {
        let found = void 0;
        if (type === 'state') {
            this.states.forEach(e => {
                if (e.id === name) found = e;
            });
            if (found) return found;
            found = {id: name, value: name, type: 'ordinary'} as State;
            this.states.push(found);
        } else {
            this.actions.forEach(e => {
                if (e.id === name) found = e;
            });
            if (found) return found;
            found = {id: name, value: name} as Action;
            this.actions.push(found);
        }
        return found;
    }

    getInitial(): State {
        return this.states.filter(e => e.type === 'initial')[0];
    }

    getRulesByState(state: State): Rule[] {
        return this.rules.filter(e => e.input.state.id === state.id);
    }

    static isState(name: string): boolean {
        return name[0].toLowerCase() !== name[0];
    }

    public static parse(input: string): Parser {
        const parser = new Parser();
        const strs = input.trim().split(';').map(e => e.trim());
        strs.forEach(str => {
            const regDeclaration = /^(#|>)\s*(\w+)\s*(:\s*\w+)?\s*=\s*(".+"|.+)/;
            if (regDeclaration.test(str)) {
                const [,state,name,type,value] = regDeclaration.exec(str);
                if (Parser.isState(name)) {
                    parser.states.push({
                        id: name,
                        value: value.replace(/"/g, ""),
                        type: state === '#' ? 'initial' : 'ordinary',
                    });
                } else {
                    try {
                        parser.actions.push({
                            id: name,
                            value: /^".*/.test(value) ? value.replace(/"/g, "") : eval(value),
                            type: type ? /:\s*(\w+)/.exec(type)[1] : void 0,
                        });
                    } catch (e) {
                        console.log("Error occurred while evaluating action", name);
                    }
                }
            }
            const regRule = /^(\w+)\s+(\w+)\s*->\s*(\w+)\s+(\w+)?/;
            if (regRule.test(str)) {
                const [, stateIn, eventIn, actionOut, stateOut] = regRule.exec(str);
                const rule = {} as Rule;
                const varStateIn = parser.getOrCreate(stateIn, 'state') as State;
                const action = parser.getOrCreate(eventIn, 'action');
                rule.input = { state: varStateIn, event: action };
                const action2 = parser.getOrCreate(actionOut, 'action');
                if (stateOut) {
                    const varStateOut = parser.getOrCreate(stateOut, 'state') as State;
                    rule.output = {
                        state: varStateOut,
                        action: action2,
                    };
                } else {
                    rule.output = {
                        action: action2,
                    };
                }
                parser.rules.push(rule);
            }
        });
        return parser;
    }
}
