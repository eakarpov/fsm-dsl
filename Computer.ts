import {ParseObject} from "./Parser";

class Computer {
    private result: string;
    private argument: string;
    private fsm: ParseObject;
    private log: string[] = [];

    public initialize(parseObject: ParseObject): Computer {
        this.fsm = parseObject;
        return this;
    }

    public load(argument: string): Computer {
        this.argument = argument;
        this.log = [];
        return this;
    }

    public print(): void {
        console.log(this.result);
    }

    public printLog(): void {
        this.log.forEach(e => console.log(e));
    }

    public execute(): Computer {
        return this;
    }
}

export default new Computer();