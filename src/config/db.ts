import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

if (process.env['NODE_ENV'] !== 'production') global.prisma = prisma

export default prisma