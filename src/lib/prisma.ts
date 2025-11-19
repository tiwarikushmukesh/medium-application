import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const createPrisma = (dburl : string) =>{
    return new PrismaClient({
        datasourceUrl: dburl
    }).$extends(withAccelerate())
}