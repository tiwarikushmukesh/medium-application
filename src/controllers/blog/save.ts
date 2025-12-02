import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export default async function ( c:Context ) {
    try{
        const body = await c.req.json<{
            id: string,
            title : string,
            content: string,
        }>()
        const {id, title, content} = body;
        const user = c.get("user")
        const authorId = user.userId
        const prisma = createPrisma(c.env.DATABASE_URL)
        const response = await prisma.blog.update({
            where:{
                id,
                authorId
            },
            data : {
                title,
                content
            }
        })
        return c.json({message:"saved"},200)
    }catch(err){
        return c.json({err:err});
    }    
}