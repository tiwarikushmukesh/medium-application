import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export const userAllBlogs = async (c:Context) => {
    try{
        const user = c.get("user");
        const prisma = createPrisma(c.env.DATABASE_URL);
        const blogs = await prisma.blog.findMany({
            where: {
                authorId: user.id
            }
        })
        return c.json({blogs:blogs},200);
    }catch(err){
        return c.json({error:"Error getting user blogs"},500);
    }
}