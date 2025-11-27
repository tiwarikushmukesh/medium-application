import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export const publishBlog = async (c : Context) => {
    try{
        // values
        const body = await c.req.json<{
            title: string
            content: string
        }>();
        const {title, content} = body;
        const user = c.get("user");
        console.log(body)
        // prisma client
        const prisma = createPrisma(c.env.DATABASE_URL);
        // query 
        await prisma.blog.create({
            data:{
                authorId: user.userId,
                title,
                content,
                published: true
            }
        });
        // response
        return c.json({message:"Blog created!"},200);
    }catch(err){
        return c.json({err:"Error creating blog"},500);
    }
}