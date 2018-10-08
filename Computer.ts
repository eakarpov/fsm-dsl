import Parser, {State} from "./Parser";

class Computer {
    private argument: any;
    private fsm: Parser;
    private log: string[] = [];

    public initialize(parseObject: Parser): Computer {
        this.fsm = parseObject;
        return this;
    }

    public load(argument: any): Computer {
        this.argument = argument;
        this.log = [];
        return this;
    }

    public print(): void {
        console.log(this.argument);
    }

    public printLog(): void {
        this.log.forEach(e => console.log(e));
    }

    private tick(state?: State) {
        if (!state) return this.argument;
        const rules = this.fsm.getRulesByState(state);
        rules.forEach(rule => {
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
            if (rule.input.event.value(this.argument)) {
                this.argument = rule.output.action.value(this.argument);
                this.tick(rule.output.state);
            }
        });
    }

    public execute(): Computer {
        try {
            this.tick(this.fsm.getInitial());
            console.log(this.argument);
            return this;
        } catch (e) {
            console.log("Error while executing machine");
        }
    }
}

export default new Computer();
