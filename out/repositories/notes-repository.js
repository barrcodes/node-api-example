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
exports.NotesRepo = exports.NotesRepository = void 0;
const postgres_repository_1 = require("./postgres-repository");
const tsyringe_1 = require("tsyringe");
let NotesRepository = class NotesRepository extends postgres_repository_1.PgRepo {
    constructor() {
        super(...arguments);
        this.name = "Notes";
    }
    getNotes(userId) {
        return this.withClient((client) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT * FROM notes WHERE "createdBy" = $1;';
            const values = [userId];
            const result = yield client.query(sql, values);
            return result.rows;
        }));
    }
    getNote(id) {
        return this.withClient((client) => __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM notes WHERE id = $1;";
            const values = [id];
            const result = yield client.query(sql, values);
            if (result.rowCount === 0) {
                return undefined;
            }
            const note = result.rows[0];
            note.createdOn = new Date(note.createdOn);
            return note;
        }));
    }
    createNote(userId, { title, contents }) {
        return this.withClient((client) => __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO notes("createdBy", "createdOn", title, contents) VALUES ($1, $2, $3, $4);';
            const values = [userId, new Date(), title, contents];
            yield client.query(sql, values);
        }));
    }
    updateNote(id, { title, contents }) {
        return this.withClient((client) => __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE notes SET (title, contents) = ($1, $2) WHERE id = $3;";
            const values = [title, contents, id];
            yield client.query(sql, values);
        }));
    }
    deleteNote(id) {
        return this.withClient((client) => __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM notes WHERE id = $1;";
            const values = [id];
            yield client.query(sql, values);
        }));
    }
};
NotesRepository = __decorate([
    (0, tsyringe_1.injectable)()
], NotesRepository);
exports.NotesRepository = NotesRepository;
exports.NotesRepo = new NotesRepository();
//# sourceMappingURL=notes-repository.js.map