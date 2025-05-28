"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeCategory = exports.createFakeProduct = void 0;
const faker_1 = require("@faker-js/faker");
const createFakeProduct = (categoryId, categoryName) => ({
    name: faker_1.faker.commerce.productName(),
    description: faker_1.faker.commerce.productDescription(),
    price: parseFloat(faker_1.faker.commerce.price()),
    createdAt: faker_1.faker.date.past(),
    deletedAt: Math.random() > 0.2 ? null : faker_1.faker.date.recent(),
    image: faker_1.faker.image.urlLoremFlickr({ category: categoryName.toLowerCase(), height: 200 }),
    categoryId,
    featured: Math.random() < 0.2 ? true : false,
});
exports.createFakeProduct = createFakeProduct;
const createFakeCategory = () => ({
    name: faker_1.faker.commerce.department()
});
exports.createFakeCategory = createFakeCategory;
//# sourceMappingURL=faker.js.map