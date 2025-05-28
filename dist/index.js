"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use('/', index_js_1.default);
app.listen(3000, () => console.log("Server ready on port 3000."));
exports.default = app;
//# sourceMappingURL=index.js.map