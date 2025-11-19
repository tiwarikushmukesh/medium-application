
import { MiddlewareHandler } from "hono";
import { z } from "zod";

const loginSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: z.string().min(6),
})

export const signUpZod : MiddlewareHandler = async (c,next) => {
    try{
        const body = await c.req.json<{
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        }>();
        const parsed = loginSchema.parse(body)
        c.set("parsedValue", parsed)
        await next();
    }catch(err){
        return c.json({message:"Zod Error"},400)
    }
}