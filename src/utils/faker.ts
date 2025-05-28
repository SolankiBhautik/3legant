import { faker } from '@faker-js/faker';

// Accept category and return a product related to that category
export const createFakeProduct = (categoryId: number, categoryName: string) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    createdAt: faker.date.past(),
    deletedAt: Math.random() > 0.2 ? null : faker.date.recent(),
    image: faker.image.urlLoremFlickr({ category: categoryName.toLowerCase(), height: 200 }),
    categoryId,
    featured: Math.random() < 0.2 ? true : false,
})


// Generates a fake category
export const createFakeCategory = () => ({
    name: faker.commerce.department()
});