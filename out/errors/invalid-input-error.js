"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrRejectInvalidInput = exports.InvalidInputError = void 0;
const class_validator_1 = require("class-validator");
class InvalidInputError {
    constructor(field, data) {
        this.field = field;
        this.data = data;
        this.name = "InvalidInputError";
        const dataText = JSON.stringify(data);
        this.message = `Attempted to post invalid data. field: ${field}, value: ${dataText}`;
    }
}
exports.InvalidInputError = InvalidInputError;
const validateOrRejectInvalidInput = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, class_validator_1.validateOrReject)(data);
    }
    catch (e) {
        throw new InvalidInputError("body", data);
    }
});
exports.validateOrRejectInvalidInput = validateOrRejectInvalidInput;
//# sourceMappingURL=invalid-input-error.js.map