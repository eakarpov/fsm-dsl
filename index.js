"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var Computer_1 = require("./Computer");
function main() {
    var example = "\n    # S = \"Initial state\";\n    > A = \"Second state\";\n    > B = \"Third state\";\n    > a : Int = x => x > 0;\n    > b : Int = x => x <= 0;\n    > c : Int = x => x + 11;\n    > d : Int = x => x - 5;\n    \n    S a -> d A;\n    S b -> c B;\n    A a -> c B;\n    A b -> d B;\n    ";
    var fsm = Parser_1.default.parse(example);
    Computer_1.default
        .initialize(fsm)
        .load(1)
        .execute()
        .load(-5)
        .execute();
    Computer_1.default.printLog();
}
main();
