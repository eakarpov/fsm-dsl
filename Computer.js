"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Computer = /** @class */ (function () {
    function Computer() {
        this.log = [];
    }
    Computer.prototype.initialize = function (parseObject, initial) {
        this.fsm = parseObject;
        this.argument = initial;
        this.state = this.fsm.getInitial();
        this.log = [];
        return this;
    };
    Computer.prototype.dispatch = function (event, payload) {
        var rules = this.fsm.getRulesByState(this.state);
        var filteredRules = rules.filter(function (e) { return e.input.event.id === event; });
        var rule = filteredRules[0];
        if (rule) {
            var type = rule.input.event.type;
            if (type) {
                switch (type) {
                    case 'Int': {
                        this.argument = parseInt(this.argument);
                        break;
                    }
                    case 'Float': {
                        this.argument = parseFloat(this.argument);
                        break;
                    }
                }
            }
            var res = rule.output.action.value(this.argument)(payload);
            this.log.push("from " + this.state.id + " to " + rule.output.state.id + " with " + event + " action");
            this.log.push("payload modified from " + this.argument + " to " + res);
            this.argument = res;
            this.state = rule.output.state;
        }
        else {
            throw new Error('Event not found');
        }
        return this;
    };
    Computer.prototype.reload = function (input) {
        this.print();
        this.state = this.fsm.getInitial();
        if (input) {
            this.argument = input;
        }
        return this;
    };
    Computer.prototype.print = function () {
        console.log(this.argument);
    };
    Computer.prototype.get = function () {
        return this.argument;
    };
    Computer.prototype.printLog = function () {
        this.log.forEach(function (e) { return console.log(e); });
    };
    return Computer;
}());
exports.default = new Computer();
