"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessError = void 0;
class AccessError {
    constructor(userId, repositoryName, id) {
        this.name = "AccessError";
        this.message = `User ${userId} is not authorized to perform action on resource ${repositoryName} id ${id}.`;
    }
}
exports.AccessError = AccessError;
//# sourceMappingURL=access-error.js.map