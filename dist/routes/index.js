"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_js_1 = __importDefault(require("./product.js"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("Hello, World!");
});
router.use('/api/products', product_js_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map