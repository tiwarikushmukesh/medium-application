import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export const allblogs = async (c:Context) => {
    try{
        const prisma = createPrisma(c.env.DATABASE_URL);
        const blogs = await prisma.blog.findMany({
            where: {
                published: true
            }
        });
        return c.json({blogs:blogs},200);
    }catch(err){
        return c.json({error:"Error getting blogs"},500);
    }
}