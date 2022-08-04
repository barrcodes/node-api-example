"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originHandler = void 0;
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
//# sourceMappingURL=origin-handler.js.map