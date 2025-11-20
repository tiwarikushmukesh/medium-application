import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export const status = async (c:Context) => {
    try{
        // values
        const body = await c.req.json<{
            id: string
            published: boolean
        }>();
        const { id, published } = body;
        // prisma client
        const prisma = createPrisma(c.env.DATABASE_URL);
        // query
        await prisma.blog.update({
            where: {
                id
            },
            data:{
                published
            }
        });
        return published? c.json({ message: "Blog published" }, 200): c.json({ message: "Blog unpublished" }, 200);
    }catch(err){
        return c.json({error:"Error publishing blog"},500);
    }
}