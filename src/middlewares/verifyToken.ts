import { MiddlewareHandler } from "hono";
import { auth } from "hono/utils/basic-auth";
import { verifyToken } from "../jwt/verify";

export const tokenValidation:MiddlewareHandler = async (c,next) => {
    try{
        // checking authorization 
        const authHeader = c.req.header("Authorization");
        if (!authHeader) return c.json({error:"Authorization header missing"},401);
        // token validation
        const token= authHeader.replace("Bearer ","");
        const payload = await verifyToken(token,c.env.SECRET);
        if (!payload) return c.json({error:"Invalid token"},400);
        // set payload 
        c.set("user",payload); // user --> {id, email}
        await next()
    }catch(err){
        c.json({message:"Invalid token"},400);
    }
}