"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = __importDefault(require("./db.js"));
const faker_js_1 = require("../utils/faker.js");
async function main() {
    const fakeCategories = Array.from({ length: 5 }, () => (0, faker_js_1.createFakeCategory)());
    await db_js_1.default.category.createMany({
        data: fakeCategories,
        skipDuplicates: true
    });
    const categories = await db_js_1.default.category.findMany();
    const products = Array.from({ length: 20 }, () => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        if (!category) {
            throw new Error("No categories found to associate with products.");
        }
        return (0, faker_js_1.createFakeProduct)(category.id, category.name);
    });
    await db_js_1.default.product.createMany({ data: products });
    console.log("✅ Seeded DB with fake products and categories.");
}
main();
//# sourceMappingURL=seed.js.map