import express from 'express';
import prisma from '../config/db.js';
import { Prisma } from '../../generated/prisma/index.js'

const router = express.Router();

router.get('/', async (req, res) => {

    let featured = req.query['featured'] == 'true' ? true : false;

    let search = req.query['search'] as string || null;

    let limit = parseInt(req.query['limit'] as string) || 20;
    limit = Math.min(limit, 100); // Cap the limit to 100

    const query: Prisma.ProductFindManyArgs = {
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    };

    if (featured == true) {
        query.where = {
            featured: true
        };
    }

    if (search) {
        query.where = {
            OR: [
                {
                    name: {
                        search: search
                    }
                },
                {
                    description: {
                        search: search
                    }
                },
                {
                    category: {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                }
            ]
        };
        query.orderBy = {
            _relevance: {
                fields: ['name', 'description'],
                search: search,
                sort: 'desc'
            }
        };
    }


    const products = await prisma.product.findMany(query);
    res.send(products);
});


router.post('/', async (req, res): Promise<any> => {
    if (!req.body.name || !req.body.price || isNaN(req.body.price) || req.body.price <= 0 || !req.body.description || !req.body.image) {
        return res.status(400).send({ error: 'Name, price, description, and image are required' });
    }
    const { name, price, categoryId, description, image } = req.body;

    const product = await prisma.product.create({
        data: {
            name,
            price,
            categoryId: categoryId || null,
            description,
            image,
        }
    });

    res.status(201).send(product);
});


router.get('/:id', async (req, res): Promise<any> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        return res.send(product);
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});


router.put('/:id', async (req, res): Promise<any> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        const name = req.body.name || product.name;
        const price = parseFloat(req.body.price) || product.price;

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { name, price }
        });

        return res.send(updatedProduct);
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});



router.delete('/:id', async (req, res): Promise<any> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send({ error: 'Invalid product ID' });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            return res.status(404).send({ error: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
    }
});


export default router;