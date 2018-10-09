import Parser from "./Parser";
import Computer from "./Computer";

function main() {
    const example = `
    # S = "Initial state";
    > A = "Second state";
    > B = "Third state";
    > a = "Add value";
    > b = "Subtract value";
    > c : Int = p => c => c + p;
    > d : Int = p => c => p - c;
    
    S a -> d A;
    S b -> c B;
    A a -> c B;
    A b -> d B;
    `;

    const fsm = Parser.parse(example);

    Computer
        .initialize(fsm, 2)
        .dispatch('a', 3)
        .dispatch('b', -3);

    Computer.printLog();
}

main();
