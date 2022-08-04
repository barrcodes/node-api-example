"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const handlers_1 = require("./handlers");
const controllers_1 = require("./controllers");
const createApp = (port, allowList) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)((req, callback) => {
        const origin = req.header("origin");
        callback(null, {
            origin: (0, handlers_1.originHandler)(allowList, origin),
        });
    }));
    app.use("/notes", controllers_1.NotesController);
    app.use(handlers_1.errorHandler);
    app.listen(port, () => {
        console.log(`API running on port ${port}.`);
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map