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
exports.PgRepo = void 0;
const pg_1 = require("pg");
class PgRepo {
    withClient(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClient();
            let result = yield cb(client);
            yield client.end();
            return result;
        });
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDB}`;
            const client = new pg_1.Client({
                connectionString,
                ssl: false,
            });
            yield client.connect();
            return client;
        });
    }
}
exports.PgRepo = PgRepo;
//# sourceMappingURL=postgres-repository.js.map