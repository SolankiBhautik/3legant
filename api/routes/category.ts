import express from "express"
import prisma from "../config/db.js"
import { ErrorResponse } from "../types/index.js"

const router = express.Router()

// list
router.get("/", async (req, res) => {
    const categories = await prisma.category.findMany()
    if (!categories || categories.length === 0) {
        let errorResponse: ErrorResponse = {
            error: "No categories found"
        }
        res.status(404).json(errorResponse)
        return
    }
    res.json(categories)
})


// detail
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: "Invalid category ID"
        }
        res.status(400).json(errorResponse)
        return
    }
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            products: true
        }
    })
    if (!category) {
        let errorResponse: ErrorResponse = {
            error: "Category not found"
        }
        res.status(404).json(errorResponse)
        return
    }
    res.json(category)
});

// create
router.post("/", async (req, res) => {
    if (!req.body.name) {
        let errorResponse: ErrorResponse = {
            error: "Name is required"
        }
        res.status(400).json(errorResponse)
        return
    }
    const { name } = req.body

    const category = await prisma.category.create({
        data: {
            name
        }
    })
    res.status(201).json(category)
});

// update
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: "Invalid category ID"
        }
        res.status(400).json(errorResponse)
        return
    }
    if (!req.body.name) {
        let errorResponse: ErrorResponse = {
            error: "Name is required"
        }
        res.status(400).json(errorResponse)
        return
    }
    const { name } = req.body

    const category = await prisma.category.update({
        where: { id },
        data: { name }
    })
    res.status(200).json(category)
});

// delete
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
        let errorResponse: ErrorResponse = {
            error: "Invalid category ID"
        }
        res.status(400).json(errorResponse)
        return
    }
    await prisma.category.delete({
        where: { id }
    })
    res.status(204).send()
});

export default router