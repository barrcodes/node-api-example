"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = exports.originHandler = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const originHandler = (allowList, origin) => {
    let allowOrigin = false;
    if (!allowList || allowList.length === 0) {
        allowOrigin = true;
    }
    else if (origin && allowList.includes(origin)) {
        allowOrigin = true;
    }
    else {
        console.log(`Blocking origin: ${origin}`);
    }
    return allowOrigin;
};
exports.originHandler = originHandler;
const createApp = (port, allowList) => {
    const app = (0, express_1.default)();
    app.listen(port, () => {
        console.log(`API running on port ${port}.`);
    });
    app.use(express_1.default.json());
    app.use((0, cors_1.default)((req, callback) => {
        const origin = req.header("origin");
        callback(null, {
            origin: (0, exports.originHandler)(allowList, origin),
        });
    }));
    app.get("/", (req, res) => {
        res.sendStatus(200);
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map