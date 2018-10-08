"use strict";
exports.__esModule = true;
var Parser = /** @class */ (function () {
    function Parser() {
        this.context = [];
        this.rules = [];
    }
    Parser.prototype.getOrCreate = function (name) {
        var found = void 0;
        this.context.forEach(function (e) {
            if (e.id === name)
                found = e;
        });
        if (found)
            return found;
        var res = { id: name, value: name, type: Parser.isState(name) };
        this.context.push(res);
        return res;
    };
    Parser.isState = function (name) {
        return name[0].toLowerCase() === name[0] ? 'action' : 'state';
    };
    Parser.parse = function (input) {
        var parser = new Parser();
        var strs = input.trim().split(';');
        strs.forEach(function (str) {
            var regDeclaration = /^#\s*(\w+)\s*=\s*(\w+)/;
            if (regDeclaration.test(str)) {
                var _a = regDeclaration.exec(str), name_1 = _a[1], value = _a[2];
                parser.context.push({ id: name_1, value: value, type: Parser.isState(name_1) });
            }
            var regRule = /^\s*(\w+)(.+)->\s*(\w+)(.*)/;
            if (regRule.test(str)) {
                var _b = regRule.exec(str), stateIn = _b[1], actionsIn = _b[2], stateOut = _b[3], actionsOut = _b[4];
                var rule = {};
                var varStateIn = parser.getOrCreate(stateIn);
                var actions = actionsIn.trim().split(' ').map(function (a) { return parser.getOrCreate(a); });
                rule.input = { state: varStateIn, actions: actions };
                var varOut = parser.getOrCreate(stateOut);
                if (actionsOut) {
                    rule.output = {
                        state: varOut,
                        actions: actionsOut.trim().split(' ').map(function (a) { return parser.getOrCreate(a); })
                    };
                }
                else {
                    rule.output = {
                        actions: [varOut]
                    };
                }
                console.log(rule);
                parser.rules.push(rule);
            }
        });
        console.log(parser.context);
        return parser;
    };
    return Parser;
}());
exports["default"] = Parser;
