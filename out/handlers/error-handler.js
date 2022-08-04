"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../errors");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof errors_1.InvalidInputError) {
        res.sendStatus(400);
    }
    else if (err instanceof errors_1.AccessError || err instanceof errors_1.AuthorizationError) {
        res.sendStatus(401);
    }
    else if (err instanceof errors_1.NonExistantDataError) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(500);
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map