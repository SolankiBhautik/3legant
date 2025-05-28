import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
declare global {
    var prisma: PrismaClient | undefined;
}
declare const prisma: any;
export default prisma;
//# sourceMappingURL=db.d.ts.map