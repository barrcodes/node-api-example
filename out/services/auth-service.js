"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AuthService = void 0;
const tsyringe_1 = require("tsyringe");
const service_1 = require("./service");
const errors_1 = require("../errors");
const usersByIdToken = {
    token1: { id: 1 },
    token2: { id: 2 },
};
/**
 * I've far over-simplified here, because auth is way out of scope.
 * Suffice it to say that we would likely have an auth service, or be using a third-party auth service.
 * My assumption here is that we would have jwt authentication with auth and id tokens.
 *
 * Tests for this class are also out of scope
 */
let AuthService = class AuthService extends service_1.Service {
    constructor() {
        super(...arguments);
        this.name = "Auth";
    }
    authenticateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getToken(req);
            if (!(yield this.tokenIsAuthorized(token))) {
                throw new errors_1.AuthorizationError();
            }
            return yield this.getUser(token);
        });
    }
    getToken(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = (_b = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [""];
            if (authHeader.length < 2) {
                throw new errors_1.AuthorizationError();
            }
            return authHeader[1];
        });
    }
    tokenIsAuthorized(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.keys(usersByIdToken).includes(token);
        });
    }
    getUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return usersByIdToken[token];
        });
    }
};
AuthService = __decorate([
    (0, tsyringe_1.injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map