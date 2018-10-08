"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Computer = /** @class */ (function () {
    function Computer() {
        this.log = [];
    }
    Computer.prototype.initialize = function (parseObject) {
        this.fsm = parseObject;
        return this;
    };
    Computer.prototype.load = function (argument) {
        this.argument = argument;
        this.log = [];
        return this;
    };
    Computer.prototype.print = function () {
        console.log(this.argument);
    };
    Computer.prototype.printLog = function () {
        this.log.forEach(function (e) { return console.log(e); });
    };
    Computer.prototype.tick = function (state) {
        var _this = this;
        if (!state)
            return this.argument;
        var rules = this.fsm.getRulesByState(state);
        rules.forEach(function (rule) {
            var type = rule.input.event.type;
            if (type) {
                switch (type) {
                    case 'Int': {
                        _this.argument = parseInt(_this.argument);
                        break;
                    }
                    case 'Float': {
                        _this.argument = parseFloat(_this.argument);
                        break;
                    }
                }
            }
            if (rule.input.event.value(_this.argument)) {
                _this.argument = rule.output.action.value(_this.argument);
                _this.tick(rule.output.state);
            }
        });
    };
    Computer.prototype.execute = function () {
        try {
            this.tick(this.fsm.getInitial());
            console.log(this.argument);
            return this;
        }
        catch (e) {
            console.log("Error while executing machine");
        }
    };
    return Computer;
}());
exports.default = new Computer();
