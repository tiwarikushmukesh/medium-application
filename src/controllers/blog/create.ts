import { Context } from "hono";
import { createPrisma } from "../../lib/prisma";

export const createBlog = async (c : Context) => {
    try{
        const user = c.get("user");
        const prisma = createPrisma(c.env.DATABASE_URL);

        const response = await prisma.blog.create({
            data : {
                title: "",
                content: "",
                authorId: user.userId
        }})

        return c.json({message:"Blog created!",blog:response.id},200);
    }catch(err){
        return c.json({err:"Error creating blog"},500);
    }
}