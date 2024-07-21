"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["todo"] = 0] = "todo";
    TaskStatus[TaskStatus["backlog"] = 1] = "backlog";
    TaskStatus[TaskStatus["in_process"] = 2] = "in_process";
    TaskStatus[TaskStatus["cancel"] = 3] = "cancel";
    TaskStatus[TaskStatus["done"] = 4] = "done";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
//# sourceMappingURL=task.interface.js.map