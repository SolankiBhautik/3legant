import express from 'express';
import prisma from '../config/db.js';
import { ErrorResponse } from '../types/index.js';

const router = express.Router();

// list
router.get('/', async (req, res) => {
    let featured = req.query['featured'] == 'true' ? true : false;

    let search = req.query['search']

    let limit = parseInt(req.query['limit'] as string) || 20;
    limit = Math.min(limit, 100);

    const query: any = {
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

// create
router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.price || isNaN(req.body.price) || req.body.price <= 0 || !req.body.description || !req.body.image) {
        let errorResponse: ErrorResponse = {
            error: 'Name, price, description, and image are required'
        };
        res.status(400).send(errorResponse);
        return;
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

// detail
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: 'Invalid product ID'
        };
        res.status(400).send(errorResponse);
        return
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });

        if (!product) {
            let errorResponse: ErrorResponse = {
                error: 'Product not found'
            };
            res.status(404).send(errorResponse);
            return
        }

        res.send(product);
        return
    } catch (error) {
        let errorResponse: ErrorResponse = {
            error: 'Internal server error'
        };
        res.status(500).send(errorResponse);
        return
    }
});

// update
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: 'Invalid product ID'
        };
        res.status(400).send(errorResponse);
        return
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            let errorResponse: ErrorResponse = {
                error: 'Product not found'
            };
            res.status(404).send(errorResponse);
            return
        }

        const name = req.body.name || product.name;
        const price = parseFloat(req.body.price) || product.price;

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: { name, price }
        });

        res.send(updatedProduct);
        return;
    } catch (error) {
        let errorResponse: ErrorResponse = {
            error: 'Internal server error'
        };
        res.status(500).send(errorResponse);
        return;
    }
});

// delete
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: 'Invalid product ID'
        };
        res.status(400).send(errorResponse);
        return;
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id }
        });

        if (!product) {
            let errorResponse: ErrorResponse = {
                error: 'Product not found'
            };
            res.status(404).send(errorResponse);
            return
        }

        await prisma.product.delete({
            where: { id }
        });

        res.status(204).send();
        return
    } catch (error) {
        let errorResponse: ErrorResponse = {
            error: 'Internal server error'
        };
        res.status(500).send(errorResponse);
        return
    }
});


export default router;