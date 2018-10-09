import Parser, {State} from "./Parser";

class Computer {
    private argument: any;
    private fsm: Parser;
    private state: State;
    private log: string[] = [];

    public initialize(parseObject: Parser, initial: any): Computer {
        this.fsm = parseObject;
        this.argument = initial;
        this.state = this.fsm.getInitial();
        this.log = [];
        return this;
    }

    public dispatch(event: string, payload: any) {
        const rules = this.fsm.getRulesByState(this.state);
        const filteredRules = rules.filter(e => e.input.event.id === event);
        const rule = filteredRules[0];
        if (rule) {
            const type = rule.input.event.type;
            if (type) {
                switch (type) {
                    case 'Int': {
                        this.argument = parseInt(this.argument);
                        break;
                    }
                    case 'Float': {
                        this.argument = parseFloat(this.argument);
                        break;
                    }
                }
            }
            const res = rule.output.action.value(this.argument)(payload);
            this.log.push(`from ${this.state.id} to ${rule.output.state.id} with ${event} action`);
            this.log.push(`payload modified from ${this.argument} to ${res}`);
            this.argument = res;
            this.state = rule.output.state;
        } else {
            throw new Error('Event not found');
        }
        return this;
    }

    public reload(input?: any) {
        this.print();
        this.state = this.fsm.getInitial();
        if (input) {
            this.argument = input;
        }
        return this;
    }

    public print(): void {
        console.log(this.argument);
    }

    public get(): any {
        return this.argument;
    }

    public printLog(): void {
        this.log.forEach(e => console.log(e));
    }
}

export default new Computer();
