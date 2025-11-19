import { MiddlewareHandler } from "hono";
import { z } from "zod";
const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
})
export const signInZod: MiddlewareHandler = async (c,next) => {
    try{
        const body = await c.req.json();
        const parsedValued = loginSchema.parse(body);
        c.set("parsedValue",parsedValued);
        await next();
    }catch(err){
        return c.json({message:"Zod error"},400)
    }
}