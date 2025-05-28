import prisma from './db.js';



async function main() {
    await prisma.product.deleteMany({});
    console.log("Cleaned DB of all products.");
}


main() 