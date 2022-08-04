"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonExistantDataError = void 0;
class NonExistantDataError {
    constructor(repositoryName, id) {
        this.name = "NonExistantDataError";
        this.message = `${repositoryName} does not contain data at id ${id}`;
    }
}
exports.NonExistantDataError = NonExistantDataError;
//# sourceMappingURL=non-existant-data.js.map