import { MiddlewareHandler } from "hono";
import { auth } from "hono/utils/basic-auth";
import { verifyToken } from "../jwt/verify";
import { getCookie } from "hono/cookie";
import { errors } from "jose";

export const tokenValidation:MiddlewareHandler = async (c,next) => {
    try{
        // checking authorization 
        const token = getCookie(c, "token");
        if (!token) return c.json({message:"Unauthorized"},401);
        // token validation
        
        const payload = await verifyToken(token,c.env.SECRET);
        if (!payload) return c.json({error:"Invalid token"},400);
        // set payload 
        c.set("user",payload); // user --> {id, email}
        await next()
    }catch(err){
        c.json({message:"Invalid token"},400);
    }
}