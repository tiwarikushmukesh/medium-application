import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export default async function (c:Context){
    const id = await c.req.param("id");
    const prisma = createPrisma(c.env.DATABASE_URL);
    const blog = await prisma.blog.findUnique({
        where: {
            id 
        },
        select:{
            id: true,
            title: true,
            content: true,
            user : {
                select: {
                    firstName : true,
                    lastName : true,   
                }
            }
        }
    })
    return c.json({blog:blog});
}