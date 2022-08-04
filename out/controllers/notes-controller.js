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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const services_1 = require("../services");
const auth_service_1 = require("../services/auth-service");
exports.NotesController = express_1.default.Router();
exports.NotesController.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
        const user = yield authService.authenticateUser(req);
        const service = tsyringe_1.container.resolve(services_1.NotesService);
        const notes = yield service.getNotes(user.id);
        res.send(notes);
    }
    catch (e) {
        next(e);
    }
}));
exports.NotesController.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
        const user = yield authService.authenticateUser(req);
        const service = tsyringe_1.container.resolve(services_1.NotesService);
        const note = yield service.getNote(user.id, +req.params.id);
        res.send(note);
    }
    catch (e) {
        next(e);
    }
}));
exports.NotesController.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
        const user = yield authService.authenticateUser(req);
        const service = tsyringe_1.container.resolve(services_1.NotesService);
        yield service.createNote(user.id, req.body);
        res.sendStatus(201);
    }
    catch (e) {
        next(e);
    }
}));
exports.NotesController.patch("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
        const user = yield authService.authenticateUser(req);
        const service = tsyringe_1.container.resolve(services_1.NotesService);
        yield service.updateNote(user.id, +req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
}));
exports.NotesController.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authService = tsyringe_1.container.resolve(auth_service_1.AuthService);
        const user = yield authService.authenticateUser(req);
        const service = tsyringe_1.container.resolve(services_1.NotesService);
        yield service.deleteNote(user.id, +req.params.id);
        res.sendStatus(204);
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=notes-controller.js.map