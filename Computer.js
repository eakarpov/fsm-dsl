"use strict";
exports.__esModule = true;
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
        console.log(this.result);
    };
    Computer.prototype.printLog = function () {
        this.log.forEach(function (e) { return console.log(e); });
    };
    Computer.prototype.execute = function () {
        return this;
    };
    return Computer;
}());
exports["default"] = new Computer();
