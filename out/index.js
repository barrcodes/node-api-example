"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
const port = +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080);
if (isNaN(port)) {
    console.error(`invalid port: ${process.env.PORT}`);
    process.exit(1);
}
const allowList = ((_c = (_b = process.env.ALLOW_LIST) === null || _b === void 0 ? void 0 : _b.split(",")) !== null && _c !== void 0 ? _c : [])
    .map((url) => url.trim())
    .filter((url) => Boolean(url));
const app = (0, app_1.createApp)(port, allowList);
//# sourceMappingURL=index.js.map