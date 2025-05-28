import prisma from './db.js';
import { createFakeCategory, createFakeProduct } from '../utils/faker.js';

async function main() {
    const fakeCategories = Array.from({ length: 5 }, () => createFakeCategory());
    await prisma.category.createMany({
        data: fakeCategories,
        skipDuplicates: true
    });

    const categories = await prisma.category.findMany();

    const products = Array.from({ length: 20 }, () => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        if (!category) {
            throw new Error("No categories found to associate with products.");
        }
        return createFakeProduct(category.id, category.name);
    });

    await prisma.product.createMany({ data: products });

    console.log("✅ Seeded DB with fake products and categories.");
}

main()