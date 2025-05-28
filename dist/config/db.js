"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = global.prisma || new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
if (process.env['NODE_ENV'] !== 'production')
    global.prisma = prisma;
exports.default = prisma;
//# sourceMappingURL=db.js.map