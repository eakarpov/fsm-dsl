import Parser from "./Parser";
import Computer from "./Computer";

function main() {
    const example = `
    # S = state;
    # a = action;
    
    Sa -> a;
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
