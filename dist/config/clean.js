"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = __importDefault(require("./db.js"));
async function main() {
    await db_js_1.default.product.deleteMany({});
    console.log("Cleaned DB of all products.");
}
main();
//# sourceMappingURL=clean.js.map