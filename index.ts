import Parser from "./Parser";
import Computer from "./Computer";

function main() {
    const example = `
    # S = state;
    # a = action;
    
    S a -> a;
    `;

    const fsm = Parser.parse(example);

    Computer
        .initialize(fsm)
        .load("a")
        .execute()
        .load("b")
        .execute();

    Computer.printLog();
}

main();
