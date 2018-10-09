"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser() {
        this.states = [];
        this.actions = [];
        this.rules = [];
    }
    Parser.prototype.getOrCreate = function (name, type) {
        var found = void 0;
        if (type === 'state') {
            this.states.forEach(function (e) {
                if (e.id === name)
                    found = e;
            });
            if (found)
                return found;
            found = { id: name, value: name, type: 'ordinary' };
            this.states.push(found);
        }
        else {
            this.actions.forEach(function (e) {
                if (e.id === name)
                    found = e;
            });
            if (found)
                return found;
            found = { id: name, value: name };
            this.actions.push(found);
        }
        return found;
    };
    Parser.prototype.getInitial = function () {
        return this.states.filter(function (e) { return e.type === 'initial'; })[0];
    };
    Parser.prototype.getRulesByState = function (state) {
        return this.rules.filter(function (e) { return e.input.state.id === state.id; });
    };
    Parser.isState = function (name) {
        return name[0].toLowerCase() !== name[0];
    };
    Parser.parse = function (input) {
        var parser = new Parser();
        var strs = input.trim().split(';').map(function (e) { return e.trim(); });
        strs.forEach(function (str) {
            var regDeclaration = /^(#|>)\s*(\w+)\s*(:\s*\w+)?\s*=\s*(".+"|.+)/;
            if (regDeclaration.test(str)) {
                var _a = regDeclaration.exec(str), state = _a[1], name_1 = _a[2], type = _a[3], value = _a[4];
                if (Parser.isState(name_1)) {
                    parser.states.push({
                        id: name_1,
                        value: value.replace(/"/g, ""),
                        type: state === '#' ? 'initial' : 'ordinary',
                    });
                }
                else {
                    try {
                        parser.actions.push({
                            id: name_1,
                            value: /^".*/.test(value) ? value.replace(/"/g, "") : eval(value),
                            type: type ? /:\s*(\w+)/.exec(type)[1] : void 0,
                        });
                    }
                    catch (e) {
                        console.log("Error occurred while evaluating action", name_1);
                    }
                }
            }
            var regRule = /^(\w+)\s+(\w+)\s*->\s*(\w+)\s+(\w+)?/;
            if (regRule.test(str)) {
                var _b = regRule.exec(str), stateIn = _b[1], eventIn = _b[2], actionOut = _b[3], stateOut = _b[4];
                var rule = {};
                var varStateIn = parser.getOrCreate(stateIn, 'state');
                var action = parser.getOrCreate(eventIn, 'action');
                rule.input = { state: varStateIn, event: action };
                var action2 = parser.getOrCreate(actionOut, 'action');
                if (stateOut) {
                    var varStateOut = parser.getOrCreate(stateOut, 'state');
                    rule.output = {
                        state: varStateOut,
                        action: action2,
                    };
                }
                else {
                    rule.output = {
                        action: action2,
                    };
                }
                parser.rules.push(rule);
            }
        });
        return parser;
    };
    return Parser;
}());
exports.default = Parser;
