"use strict";
exports.__esModule = true;
var Parser_1 = require("./Parser");
var Computer_1 = require("./Computer");
function main() {
    var example = "\n    # S = state;\n    # a = action;\n    \n    S a -> a;\n    ";
    var fsm = Parser_1["default"].parse(example);
    Computer_1["default"]
        .initialize(fsm)
        .load("a")
        .execute()
        .load("b")
        .execute();
    Computer_1["default"].printLog();
}
main();
