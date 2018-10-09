"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var Computer_1 = require("./Computer");
function main() {
    var example = "\n    # S = \"Initial state\";\n    > A = \"Second state\";\n    > B = \"Third state\";\n    > a = \"Add value\";\n    > b = \"Subtract value\";\n    > c : Int = p => c => c + p;\n    > d : Int = p => c => p - c;\n    \n    S a -> d A;\n    S b -> c B;\n    A a -> c B;\n    A b -> d B;\n    ";
    var fsm = Parser_1.default.parse(example);
    Computer_1.default
        .initialize(fsm, 2)
        .dispatch('a', 3)
        .dispatch('b', -2)
        .reload(5)
        .dispatch('a', -3)
        .dispatch('b', 2)
        .print();
    Computer_1.default.printLog();
}
main();
