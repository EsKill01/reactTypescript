"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Robot2_name, _AdvanceRobot_name;
class Robot2 {
    constructor(name) {
        _Robot2_name.set(this, void 0);
        __classPrivateFieldSet(this, _Robot2_name, name, "f");
    }
    getName() {
        return __classPrivateFieldGet(this, _Robot2_name, "f");
    }
}
_Robot2_name = new WeakMap();
class AdvanceRobot extends Robot2 {
    constructor(name) {
        super(name);
        _AdvanceRobot_name.set(this, void 0);
        __classPrivateFieldSet(this, _AdvanceRobot_name, `Advanced ${name}`, "f");
    }
    getAdvancedRobotName() {
        return __classPrivateFieldGet(this, _AdvanceRobot_name, "f");
    }
}
_AdvanceRobot_name = new WeakMap();
const robot2 = new AdvanceRobot('Jack');
console.log('Parent robot name', robot2.getName());
console.log('Subclas robot name', robot2.getAdvancedRobotName());
