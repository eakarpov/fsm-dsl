import Parser from "./Parser";
import Computer from "./Computer";

function main() {
    const example = `
    # S = "Initial state";
    > A = "Second state";
    > B = "Third state";
    > a : Int = x => x > 0;
    > b : Int = x => x <= 0;
    > c : Int = x => x + 11;
    > d : Int = x => x - 5;
    
    S a -> d A;
    S b -> c B;
    A a -> c B;
    A b -> d B;
    `;

    const fsm = Parser.parse(example);

    Computer
        .initialize(fsm)
        .load(1)
        .execute()
        .load(-5)
        .execute();

    Computer.printLog();
}

main();
