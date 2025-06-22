// Configuraçoes de conn com o prisma.

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
});
