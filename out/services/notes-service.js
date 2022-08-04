"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.NotesService = void 0;
const service_1 = require("./service");
const repositories_1 = require("../repositories");
const view_models_1 = require("../view-models");
const errors_1 = require("../errors");
const tsyringe_1 = require("tsyringe");
let NotesService = class NotesService extends service_1.Service {
    constructor(notesRepository) {
        super();
        this.notesRepository = notesRepository;
        this.name = "Notes";
    }
    getNotes(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.notesRepository.getNotes(userId);
        });
    }
    getNote(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                throw new errors_1.InvalidInputError("id", id);
            }
            const note = yield this.notesRepository.getNote(id);
            if (!note) {
                throw new errors_1.NonExistantDataError(this.name, id);
            }
            if (note.createdBy !== userId) {
                throw new errors_1.AccessError(userId, this.name, id);
            }
            return note;
        });
    }
    createNote(userId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            note = new view_models_1.CreateNoteViewModel(note);
            yield (0, errors_1.validateOrRejectInvalidInput)(note);
            yield this.notesRepository.createNote(userId, note);
        });
    }
    updateNote(userId, noteId, note) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(noteId)) {
                throw new errors_1.InvalidInputError("noteId", noteId);
            }
            note = new view_models_1.UpdateNoteViewModel(note);
            yield (0, errors_1.validateOrRejectInvalidInput)(note);
            const existingNote = yield this.notesRepository.getNote(noteId);
            if (!existingNote) {
                throw new errors_1.NonExistantDataError(this.name, noteId);
            }
            if (existingNote.createdBy !== userId) {
                throw new errors_1.AccessError(userId, this.name, noteId);
            }
            yield this.notesRepository.updateNote(noteId, note);
        });
    }
    deleteNote(userId, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(noteId)) {
                throw new errors_1.InvalidInputError("noteId", noteId);
            }
            const existingNote = yield this.notesRepository.getNote(noteId);
            if (!existingNote) {
                throw new errors_1.NonExistantDataError(this.name, noteId);
            }
            if (existingNote.createdBy !== userId) {
                throw new errors_1.AccessError(userId, this.name, noteId);
            }
            yield this.notesRepository.deleteNote(noteId);
        });
    }
};
NotesService = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [repositories_1.NotesRepository])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes-service.js.map